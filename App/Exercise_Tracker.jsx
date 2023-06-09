import { useEffect, useState } from "react"
import LINK from "./Link.jsx"
import manual_reset from "./manual_reset.js"


function Exercise_Tracker({back}){

    const [result, setResult] = useState()
    const [error, setError] = useState()



    async function getResults(e){

        e.preventDefault()

        const data = {
            _id  : e.target[0].value,
            from : e.target[1].value,
            to   : e.target[2].value,
            limit: e.target[3].value,
        }

        const consulta = await fetch(`${LINK}/api/exercise/users/${data["_id"]}/logs?from=${data.from}&to=${data.to}&limit=${data.limit}`)
                               .catch((e)=>e? console.log(e)&&setError("User Not Found") :undefined)
        const result = await consulta.json().catch((e)=>e?"Something went wrong :(":undefined)

        setResult(result)
        
    }

    //for updating the exercises automaticaly
    async function getAllResults(id){

        if(id){
            const data = {
                _id: id,
            }
            const consulta = await fetch(`${LINK}/api/exercise/users/${data["_id"]}/logs?`)
                                .catch((e)=>e?"Something went wrong :(":undefined)
            const result = await consulta.json().catch((e)=>e?"Something went wrong :(":undefined)
            setResult(result)
        }
        
    }

    
    return (<div>
                <h2>Exercise Tracker</h2>
                <p id="main_grid_exp">   
                    This App is connected to a <b>MongoDb</b> database. 
                    It querys the database and posts users or exercises depending on the fields submitted.
                    <br />
                    You can search your exercises in the last form and filter them by date or ammount.
                </p>
                <h3>Add a new User</h3>
                <Post_User />
                <h3>Add a new Exercise</h3>
                <Post_Exercise getAllResults={getAllResults}/>
                <h3>View your exercises!</h3>
                <Query_Exercises getResults={getResults} />

                
                {/* if result someone made a query! */}
                {error? <p>{error}</p> : undefined}

                {result? <h3>User {result.username} you have {result.count} exercises:</h3> : undefined}
                {result? <div id="result_wrapper">
                            {result.log.map((data, index)=>
                                <ul key={index}>
                                    <li><b>Description:</b> {data.description}</li>
                                    <li><b>Duration:</b> {data.duration}min</li>
                                    <li><b>Date:</b> {data.date}</li>
                                </ul>)}
                          </div> : undefined}

                {/* if result someone made a query! */}
                
                <button className="exercise" onClick={back}>Return To Hub</button>

            </div>)

    
    
}

function Post_User(){

    const [state, setState] = useState()

    async function createUser(e){

        e.preventDefault()

        const data = { username: e.target[0].value }
        const request = {method:"POST", headers:{ "Content-Type": "application/json"}, body: JSON.stringify(data)}        
        const consulta = await fetch(`${LINK}/api/exercise/users`,request).catch((e)=>e?"Something went wrong :(":undefined)
        const result = await consulta.json().catch((e)=>e?"Something went wrong :(":undefined)

        setState(`User succesfully created. Your User id is ${result["_id"]}!`)

        //manually reset the form!
        manual_reset(["exercise_user"])
        
        return result

    }

    return (<form id="exercise_post_user" onSubmit={createUser}>
                <label htmlFor="exercise_user">Username: </label>
                <input className="exercise" id="exercise_user" required placeholder="Submit a new username..."/>

                <input className="exercise" type="submit" value="Create User!"/>
                <p>{state}</p>
            </form>)
}

function Post_Exercise({getAllResults}){


    const [state, setState] = useState("")
    const [id, setId] = useState("")


    //fetchs when the state changes
    useEffect(()=>{
        getAllResults(id)

    },[state])

    async function addExercise(e){

        e.preventDefault()

        const data = { 
            _id        : e.target[0].value,
            description: e.target[1].value,
            duration   : e.target[2].value
        }

        //only send date if it was submitted the api will generate the actual date by default
        if(e.target[3].value!=""){
            data.date = e.target[3].value
        }

        const request = {method:"POST", headers:{ "Content-Type": "application/json"}, body: JSON.stringify(data)}        
        const consulta = await fetch(`${LINK}/api/exercise/users/${data["_id"]}/exercises`,request)
                               .catch((e)=>e?"Something went wrong :(":undefined)
        const result = await consulta.json().catch((e)=>e?"Something went wrong :(":undefined)

        setId(data["_id"])
        setState(`Exercise succesfully added!`)

        //manually reset the form!
        manual_reset(["exercise_id", "exercise_description", "exercise_duration", "exercise_date"])
        
        return result

    }


    return (<form id="exercise_post_exercise" className="exercise_form" onSubmit={addExercise}>
                <label htmlFor="exercise_id">Id: </label>
                <input className="exercise" id="exercise_id" required placeholder="Insert your user id..."/>

                <label htmlFor="exercise_description">Description: </label>
                <input className="exercise" id="exercise_description" required placeholder="Insert description..."/>

                <label htmlFor="exercise_duration">Duration: </label>
                <input className="exercise" id="exercise_duration" required placeholder="Insert duration in mins..."/>

                <label htmlFor="exercise_date">Date: </label>
                <input className="exercise" id="exercise_date" type="date" placeholder="optional" />

                <input className="exercise" type="submit" value="Add Exercise!"/>
                <p>{state}</p>
            </form>)
}

function Query_Exercises({getResults}){

    return (<form id="exercise_query_exercise" className="exercise_form" onSubmit={getResults}>
                <label htmlFor="exercise_id_query">Id: </label>
                <input className="exercise" id="exercise_id_query" required placeholder="Insert your user id..."/>

                <label htmlFor="from">From: </label>
                <input className="exercise" id="from" type="date" />

                <label htmlFor="to">To: </label>
                <input className="exercise" id="to" type="date" />

                <label htmlFor="limit">Limit Results: </label>
                <input className="exercise" id="limit" type="number" min="0" max="99" placeholder="optional" />

                <input className="exercise" type="submit" value="Search!"/>

            </form>)
}


export default Exercise_Tracker