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

    return (<div>
                <h2>Issue Tracker</h2>
                <p id="main_grid_exp">   
                    This App will let you save your own entries ("Issues" in this case) to a project.
                    This will generate an <b>id</b> number that you can use to edit or delete said entry.
                    <br />
                    To add a new Issue a <b>Title</b>, <b>Text</b> and <b>Creator Name</b> are required,
                    wherearas to edit or delete an Issue only a valid <b>id</b> is necessary.
                </p>
                <p>Please select what you wish to do!</p>
                <select className="issue" id="option_selector" onChange={select_option}>
                    <option value="1">Submit an Issue!</option>
                    <option value="2">Edit an Issue!</option>
                    <option value="3">Delete an Issue!</option>
                </select>
                <center>
                    <Issue parent_state={state} getResults={getResults}/>
                
                    <Issue_Table parent_state={query} change_state={change} results={result}/>
                </center>
                <button className="issue" onClick={back}>Return To Hub</button>
            </div>)

    
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
        const consulta = await fetch(`${LINK}/api/issues/project`,request).catch((e)=>e?setState("Something went wrong :("):undefined)
        const result = await consulta.json().catch((e)=>e?setState("Something went wrong :("):undefined)

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
        const consulta = await fetch(`${LINK}/api/issues/project`,request).catch((e)=>e?setState("Something went wrong :("):undefined)
        const result = await consulta.json().catch((e)=>e?setState("Something went wrong :("):undefined)

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
        const consulta = await fetch(`${LINK}/api/issues/project`,request).catch((e)=>e?setState("Something went wrong :("):undefined)
        const result = await consulta.json().catch((e)=>e?setState("Something went wrong :("):undefined)

        setState("Entry successfully deleted!")  

        //manually reset the form!
        manual_reset(["_id"])
        
        return result
    }

    switch(parent_state){
        //add new
        case "1":
        //edit existing
        case "2":
            return (<form id="issue_form" onSubmit={parent_state==1?createIssue:updateIssue}>

                        {parent_state==2? <label htmlFor="_id">Issue Id:</label>: undefined}
                        {parent_state==2? <input className="issue" id="_id" type="number" min="0" required 
                                           placeholder="Please submit a valid issue id..." /> : undefined}

                        <label htmlFor="issue_title">Issue Title:</label>
                        <input className="issue" id="issue_title" required={parent_state==1? true:false} 
                               placeholder="Load time" />

                        <label htmlFor="issue_text">Issue Text:</label>
                        <input className="issue" id="issue_text" required={parent_state==1? true:false}
                               placeholder="Page won't load fast enough" />

                        <label htmlFor="created_by">Submitted By:</label>
                        <input className="issue" id="created_by" required={parent_state==1? true:false} 
                               placeholder="John" />

                        <label htmlFor="assigned_to">Assigned To:</label>
                        <input className="issue" id="assigned_to" placeholder="Paul" />

                        <label htmlFor="status_text">Status Text:</label>
                        <input className="issue" id="status_text" placeholder="Fix this ASAP" />

                        {parent_state==2? <label htmlFor="open">Click to close an Issue:</label> : undefined}
                        {parent_state==2? <input className="issue" id="open" value="true" type="checkbox" /> : undefined}
                        
                        <input className="issue" id="submit_issue" type="submit" 
                               value={parent_state==1?"Create Issue!":"Update Issue!"}/>

                        <p>{state}</p>
                    </form>)
        //delete
        case "3":
            return (<form id="issue_form" onSubmit={deleteIssue}>

                        <label htmlFor="_id">Issue Id:</label>
                        <input className="issue" id="_id" type="number" min="0" required placeholder="Please submit a valid issue id..." />
                        
                        <input className="issue" id="submit_issue" type="submit" value="Delete Issue!"/>
                        <p>{state}</p>
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

                                <td data-cell="id">{entry["_id"]}</td>
                                <td data-cell="Title">{entry["issue_title"]}</td>
                                <td data-cell="Text">{entry["issue_text"]}</td>
                                {/* Spain's timezone */}
                                <td data-cell="Created On">{new Date(entry["created_on"]).toLocaleString('en-GB', { timeZone: 'CET' })}</td>
                                <td data-cell="Updated On">{new Date(entry["updated_on"]).toLocaleString('en-GB', { timeZone: 'CET' })}</td>
                                <td data-cell="Created By">{entry["created_by"]}</td>
                                <td data-cell="Assigned To">{entry["assigned_to"]}</td>
                                <td data-cell="Open">{entry["open"]?"Yes":"Closed"}</td>
                                <td data-cell="Status">{entry["status_text"]}</td>

                            </tr>)}
                        </tbody>
                    </table>
                </div>)

    }else{
        return( <div><button className="issue" onClick={change_state}>Show Current Issues!</button></div>)

    }
    
}


export default Issue_Tracker