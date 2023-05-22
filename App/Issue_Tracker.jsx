import { useState, useEffect } from "react"
import manual_reset from "./manual_reset.js"
import LINK from "./Link.jsx"



function Issue_Tracker({back}){

    const [state, setState] = useState("1")
    const [query, setQuery] = useState(false)
    const [result, setResult] = useState([])

    async function getResults(){
        const consulta = await fetch(`${LINK}/api/issues/project`)
        const result = await consulta.json()
        setResult(result)

    }

    

    function select_option(e){
        setState(e.target.value)
    }

    function change(){
       setQuery(!query)
    }
    //selects what to render deppending on the choice
    switch(state){
        //submit
        case "1":
            return (<div>
                <h1>Issue Tracker</h1>
                <p>Please select what you wish to do!</p>
                <select id="option_selector" onChange={select_option}>
                    <option value="1">Submit an Issue!</option>
                    <option value="2">Edit an Issue!</option>
                    <option value="3">Delete an Issue!</option>
                </select>
                <h3>Post an Issue!</h3>
                <Issue parent_state={state} getResults={getResults}/>
                <Issue_Table parent_state={query} change_state={change} results={result}/>
                <button onClick={back}>Return To Hub</button>
            </div>)
        //edit
        case "2":
            return (<div>
                <h1>Issue Tracker</h1>
                <p>Please select what you wish to do!</p>
                <select id="option_selector" onChange={select_option}>
                    <option value="1">Submit an Issue!</option>
                    <option value="2">Edit an Issue!</option>
                    <option value="3">Delete an Issue!</option>
                </select>
                <h3>Update an Issue!</h3>
                <Issue parent_state={state} getResults={getResults}/>
                <Issue_Table parent_state={query} change_state={change} results={result}/>
                
                <button onClick={back}>Return To Hub</button>
            </div>)
        //delete
        case "3":
            return (<div>
                <h1>Issue Tracker</h1>
                <p>Please select what you wish to do!</p>
                <select id="option_selector" onChange={select_option}>
                    <option value="1">Submit an Issue!</option>
                    <option value="2">Edit an Issue!</option>
                    <option value="3">Delete an Issue!</option>
                </select>
                <h3>Delete an Issue!</h3>
                <Issue parent_state={state} getResults={getResults}/>
                <Issue_Table parent_state={query} change_state={change} results={result} />
                
                <button onClick={back}>Return To Hub</button>
            </div>)
    }

    
}

function Issue({parent_state, getResults}){

    const [state, setState] = useState("")

    //only fetchs results when setResult is called
    useEffect(()=>{
        getResults()

    },[state])


    //I use this functions instead of useEffect because the latter re renders the WHOLE app
    //and not this particular component
    async function createIssue(e){

        e.preventDefault()

        const data = {
            issue_title: e.target[0].value,
            issue_text: e.target[1].value,
            created_by: e.target[2].value,
            assigned_to: e.target[3].value || "",
            status_text: e.target[4].value || ""

        }
        const request = {method:"POST", headers:{ "Content-Type": "application/json"}, body: JSON.stringify(data)}        
        const consulta = await fetch(`${LINK}/api/issues/project`,request).catch(setState("Something went wrong :("))
        const result = await consulta.json().catch(setState("Something went wrong :("))

        setState(`Entry succesfully created. Your Issue id is ${result["_id"]}!`)  

        //manually reset the form!
        manual_reset(["issue_title", "issue_text", 
                      "created_by", "assigned_to", "status_text"])
        
        return result
    }

    async function updateIssue(e){

        e.preventDefault()

        const data = {_id: e.target[0].value}
        
        //this prevents overwriting the fields that were submitted empty
        for(let i=1; i<=5; i++){
            if (e.target[i].value=="") continue
            else{
                data[e.target[i].id] = e.target[i].value
            } 
        }
        //close an issue if checkboxed is checked!
        if(e.target[6].checked){
            data.open = "false"
        }

        const request = {method:"PUT", headers:{ "Content-Type": "application/json"}, body: JSON.stringify(data)}        
        const consulta = await fetch(`${LINK}/api/issues/project`,request).catch(setState("Something went wrong :("))
        const result = await consulta.json().catch(setState("Something went wrong :("))

        setState("Entry successfully updated!")  

        //manually reset the form!
        manual_reset(["_id","issue_title", "issue_text", 
                      "created_by", "assigned_to", "status_text"])

        if(e.target[6].checked){
            document.getElementById("open").checked = false
        }
        
        return result
    }

    async function deleteIssue(e){

        e.preventDefault()

        const data = { _id : e.target[0].value}

        const request = {method:"DELETE", headers:{ "Content-Type": "application/json"}, body: JSON.stringify(data)}        
        const consulta = await fetch(`${LINK}/api/issues/project`,request).catch(setState("Something went wrong :("))
        const result = await consulta.json().catch(setState("Something went wrong :("))

        setState("Entry successfully deleted!")  

        //manually reset the form!
        manual_reset(["_id"])
        
        return result
    }

    switch(parent_state){
        case "1":
            return (<form id="issue_add_form" onSubmit={createIssue}>
                        <label htmlFor="issue_title">Issue Title:</label>
                        <input id="issue_title" required placeholder="Please submit a title for the issue..." />

                        <label htmlFor="issue_text">Issue Text:</label>
                        <input id="issue_text" required placeholder="Please submit a description for the issue..." />

                        <label htmlFor="created_by">Submitted By:</label>
                        <input id="created_by" required placeholder="Please submit a name for the submitter..." />

                        <label htmlFor="assigned_to">Assigned To:</label>
                        <input id="assigned_to" placeholder="Please submit a title for the issue...(optional)" />

                        <label htmlFor="status_text">Status Text:</label>
                        <input id="status_text" placeholder="Please submit a current status for the issue...(optional)" />
                        
                        <input id="submit_issue" type="submit" value="Create Issue!"/>
                        <label>{state}</label>
                    </form>)
        case "2":
            return (<form id="issue_update_form" onSubmit={updateIssue}>

                        <label htmlFor="_id">Issue Id:</label>
                        <input id="_id" type="number" min="0" required placeholder="Please submit a valid issue id..." />

                        <label htmlFor="issue_title">Issue Title:</label>
                        <input id="issue_title" placeholder="Please submit a title for the issue..." />

                        <label htmlFor="issue_text">Issue Text:</label>
                        <input id="issue_text" placeholder="Please submit a description for the issue..." />

                        <label htmlFor="created_by">Submitted By:</label>
                        <input id="created_by" placeholder="Please submit a name for the submitter..." />

                        <label htmlFor="assigned_to">Assigned To:</label>
                        <input id="assigned_to" placeholder="Please submit a title for the issue...(optional)" />

                        <label htmlFor="status_text">Status Text:</label>
                        <input id="status_text" placeholder="Please submit a current status for the issue...(optional)" />

                        <input id="open" value="true" type="checkbox" />
                        <label htmlFor="open">Click to close an Issue:</label>

                        
                        <input id="submit_issue" type="submit" value="Update Issue!"/>
                        <label>{state}</label>
                    </form>)
        case "3":
            return (<form id="issue_update_form" onSubmit={deleteIssue}>

                        <label htmlFor="_id">Issue Id:</label>
                        <input id="_id" type="number" min="0" required placeholder="Please submit a valid issue id..." />
                        
                        <input id="submit_issue" type="submit" value="Delete Issue!"/>
                        <label>{state}</label>
                    </form>)

    }

}

function Issue_Table({parent_state,change_state, results}){

    if(parent_state){
        
        return( <div>
                    <button onClick={change_state}>Hide Current Issues!</button>
                    <table id="issues_table">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Title</th>
                                <th>Text</th>
                                <th>Created On</th>
                                <th>Updated On</th>
                                <th>Created By</th>
                                <th>Assigned To</th>
                                <th>Open</th>
                                <th>Status</th>
                            </tr>

                        </thead>
                        <tbody>
                            {results.map(entry=><tr key={entry["_id"]}>

                                <td>{entry["_id"]}</td>
                                <td>{entry["issue_title"]}</td>
                                <td>{entry["issue_text"]}</td>
                                <td>{entry["created_on"]}</td>
                                <td>{entry["updated_on"]}</td>
                                <td>{entry["created_by"]}</td>
                                <td>{entry["assigned_to"]}</td>
                                <td>{entry["open"]}</td>
                                <td>{entry["status_text"]}</td>

                            </tr>)}
                        </tbody>
                    </table>
                </div>)

    }else{
        return( <div><button onClick={change_state}>Show Current Issues!</button></div>)

    }
    
}


export default Issue_Tracker