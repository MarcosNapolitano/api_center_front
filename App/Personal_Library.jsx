import { useEffect, useState } from "react"
import manual_reset from "./manual_reset.js"
import LINK from "./Link.jsx"


function Personal_Library({back}){

    const [state, setState] = useState([])
    const [comment, setComment] = useState(false)


    async function getBooks(){

        const consulta = await fetch(`${LINK}/api/library/books`).catch((e)=>e?console.error(e):undefined)
        const result = await consulta.json().catch((e)=>e?console.error(e):undefined)

        setState(result)

    }

    async function showComments(e){

        const id = e.target.id
        const consulta = await fetch(`${LINK}/api/library/books/${id}`).catch((e)=>e?console.error(e):undefined)
        const result = await consulta.json().catch((e)=>e?console.error(e):undefined)

        if(comment){

            document.getElementById(id).innerHTML=`<b>Comments: </b>${result.comments.length}`

            setComment(false)

        }else{

            document.getElementById(id).innerHTML=`<b>Comments: </b>${result.comments}`
            setComment(true)
        }
    }

    useEffect(()=>{
        getBooks()
    },[])


    return (<div>
                <h2>Personal Library</h2>
                <p id="main_grid_exp">   
                    This App is connected to a <b>MongoDb</b> database. 
                    It querys the database and posts books or comments depending on the fields submitted.
                    <br />
                    Click on the comment's numbers to see the actual comments!
                </p>
                
                <center>

                    <h3>Post a new book!</h3>
                    <Post_Book refresh={getBooks}/>
                    
                    <h3>Comment an existing book!</h3>
                    <Post_Comment refresh={getBooks}/>
                </center>

                {/* check display */}
                <div id="book_container">
                    {state.map((data,index)=><ul key={index}>
                        <li><b>Title:</b> {data.title}</li>
                        <li><b>id:</b> {data["_id"]}</li>
                        <li id={data["_id"]} onClick={showComments}><b>Comments:</b> {data.commentcount}</li>
                    </ul>)}
                </div>

                <button className="library" onClick={back}>Return To Hub</button>
            </div>)
    
}

function Post_Book({refresh}){

    const [state, setState] = useState("")

    async function postBook(e){
        

        e.preventDefault()

        const data = {
            title: e.target[0].value,
        }

        const request = {method:"POST", headers:{ "Content-Type": "application/json"}, body: JSON.stringify(data)}        
        const consulta = await fetch(`${LINK}/api/library/books`,request).catch((e)=>e?setState("Something went wrong :("):undefined)
        const result = await consulta.json().catch((e)=>e?setState("Something went wrong :("):undefined)

        setState(`Book succesfully submitted. Your Book's id is ${result["_id"]}!`)  

        //manually reset the form!
        manual_reset(["book_name"])

        refresh()
    
        return result
        
    }

    return(<form id="library_post_form" onSubmit={postBook}>
        <label id="book_label" htmlFor="book_name">Book's title: </label>
        <input className="library" type="text" id="book_name" required placeholder="Submit a new book..."/>
        <input className="library" type="submit" value="Post!"/>
        <p>{state}</p>
    </form>)
}

function Post_Comment({refresh}){
    const [state, setState] = useState("")

    async function postComment(e){
        

        e.preventDefault()

        const data = {
            _id: e.target[0].value,
            comment : e.target[1].value
        }

        const request = {method:"POST", headers:{ "Content-Type": "application/json"}, body: JSON.stringify(data)}        
        const consulta = await fetch(`${LINK}/api/library/books/${data["_id"]}`,request).catch((e)=>e?setState("Something went wrong :("):undefined)
        const result = await consulta.json().catch((e)=>e?setState("Something went wrong :("):undefined)

        setState(`Comment succesfully submitted!`)  

        //manually reset the form!
        manual_reset(["book_id", "book_comment"])

        refresh()
    
        return result
        
    }

    return(<form id="library_comment_form" onSubmit={postComment}>

        <label id="book_id_label" htmlFor="book_id">Book's id: </label>
        <input className="library" type="text" id="book_id" required placeholder="Submit a valid book's id..."/>
        <br />
        <label id="book_comment_label" htmlFor="book_comment">Comment: </label>
        <input className="library" type="text"  id="book_comment" required placeholder="Submit a comment..."/>
        <input className="library" id="comment_submit" type="submit" value="Post!"/>
        <p>{state}</p>
    </form>)
}


export default Personal_Library