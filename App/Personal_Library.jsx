import { useEffect, useState } from "react"
import manual_reset from "./manual_reset.js"
import LINK from "./Link.jsx"


function Personal_Library({back}){

    const [state, setState] = useState([])

    async function getBooks(){

        const consulta = await fetch(`${LINK}/api/library/books`).catch((e)=>e?console.error(e):undefined)
        const result = await consulta.json().catch((e)=>e?console.error(e):undefined)

        setState(result)

    }

    async function showComments(e){

        const id = e.target.id
        const consulta = await fetch(`${LINK}/api/library/books/${id}`).catch((e)=>e?console.error(e):undefined)
        const result = await consulta.json().catch((e)=>e?console.error(e):undefined)
        

        document.getElementById(id).innerHTML=`Comments: ${result.comments}`
    }

    useEffect(()=>{
        getBooks()
    },[])


    return (<div>
                <h1>Personal Library</h1>
                
                <Post_Book refresh={getBooks}/>
                <Post_Comment refresh={getBooks}/>

                {/* logre hacer el display pero esta medio villero, revisarlo */}
                {state.map((data,index)=><ul key={index}>
                    <li>Title: {data.title}</li>
                    <li>id: {data["_id"]}</li>
                    <li id={data["_id"]} onClick={showComments}> Comments: {data.commentcount}</li>
                </ul>)}

                <button onClick={back}>Return To Hub</button>
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
        <input id="book_name" required placeholder="Submit a new book..."/>
        <input type="submit" value="Post Book!"/>
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

    return(<form id="library_post_form" onSubmit={postComment}>

        <label id="book_id_label" htmlFor="book_id">Book's id: </label>
        <input id="book_id" required placeholder="Submit a valid book's id..."/>

        <label id="book_comment_label" htmlFor="book_comment">Comment: </label>
        <input id="book_comment" required placeholder="Submit a comment..."/>

        <input type="submit" value="Post Comment!"/>
        <p>{state}</p>
    </form>)
}


export default Personal_Library