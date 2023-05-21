import {useState} from "react";
import Header_Parser from "./Header_Parser.jsx"
import URL_Shortener from "./URL_Shortener.jsx"
import Metric_Converter from "./Metric_Converter.jsx"
import Issue_Tracker from "./Issue_Tracker.jsx"
import Personal_Library from "./Personal_Library.jsx"
import Exercise_Tracker from "./Exercise_Tracker.jsx"


function Main_Hub(){


    const [hub_state, setState] = useState("main_grid_container")

    //sets the state to the event id
    function clickHandler(event){

        //triggers fade out animation
        document.getElementById("app").className="app2"

        setTimeout(()=>{
            setState(event.target.id)
            document.getElementById("app").className="app1"
        },1000)
    }

    function setHub(){

        //triggers fade out animation
        document.getElementById("app").className="app2"

        setTimeout(()=>{
            setState("main_grid_container")
            document.getElementById("app").className="app1"
        },1000)
    }

    //renders differents elements depending on what is "state"
    switch (hub_state){
        case ("header_parser"):
            return <Header_Parser back={()=>setHub()}/>
        case ("url_shortener"):
            return <URL_Shortener back={()=>setHub()}/>
        case ("metric_converter"):
            return <Metric_Converter back={()=>setHub()}/>
        case ("issue_tracker"):
            return <Issue_Tracker back={()=>setHub()}/>
        case ("personal_library"):
            return <Personal_Library back={()=>setHub()}/>
        case ("exercise_tracker"):
            return <Exercise_Tracker back={()=>setHub()}/>
        default:
            return (
                <div id="main_grid_container">
                    <ul id="main_grid">
                        <li id="header_parser"    onClick={(e)=>clickHandler(e)}>Header Parser</li>
                        <li id="url_shortener"    onClick={(e)=>clickHandler(e)}>URL Shortener</li>
                        <li id="metric_converter" onClick={(e)=>clickHandler(e)}>Metric Converter</li>
                        <li id="issue_tracker"    onClick={(e)=>clickHandler(e)}>Issue Tracker</li>
                        <li id="personal_library" onClick={(e)=>clickHandler(e)}>Personal Library</li>
                        <li id="exercise_tracker" onClick={(e)=>clickHandler(e)}>Exercise Tracker</li>
                    </ul>
                </div>
            )
    }
}

export default Main_Hub