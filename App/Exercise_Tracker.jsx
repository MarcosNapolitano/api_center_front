import { useState } from "react"


function Exercise_Tracker({back}){

    return (<div>
                <h1>Exercise Tracker</h1>
                <button onClick={back}>Return To Hub</button>
            </div>)
    
}

export default Exercise_Tracker