import { useState } from "react"
import LINK from "./Link.jsx"



function Issue_Tracker({back}){

    return (<div>
                <h1>Issue Tracker</h1>
                <button onClick={back}>Return To Hub</button>
            </div>)
    
}

export default Issue_Tracker