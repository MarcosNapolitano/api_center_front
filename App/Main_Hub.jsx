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
                    <p id="main_grid_exp">   
                        This is a collection of api's I made in several courses. 
                        I decided to group them all together and give them a nice UI.
                        <br />
                        Please feel free to use whichever you desire.
                    </p>
                    <ul id="main_grid">
                        {/* onclick detects any of these ids so all of them need to be the same */}
                        <div id="header_parser"   onClick={(e)=>clickHandler(e)}>
                            <div id="header_parser"></div>
                            <li id="header_parser">Header Parser</li>
                        </div>
                        <div id="url_shortener"    onClick={(e)=>clickHandler(e)}>
                            <div id="url_shortener"></div>
                            <li id="url_shortener">URL Shortener</li>
                        </div>
                        <div id="metric_converter" onClick={(e)=>clickHandler(e)}>
                            <div id="metric_converter"></div>
                            <li id="metric_converter">Metric Converter</li>
                        </div>
                        <div id="issue_tracker"    onClick={(e)=>clickHandler(e)}>
                            <div id="issue_tracker"></div>
                            <li id="issue_tracker">Issue Tracker</li>
                        </div>
                        <div id="personal_library" onClick={(e)=>clickHandler(e)}>
                            <div id="personal_library"></div>
                            <li id="personal_library">Personal Library</li>
                        </div>
                        <div id="exercise_tracker" onClick={(e)=>clickHandler(e)}>
                            <div id="exercise_tracker"></div>
                            <li id="exercise_tracker">Exercise Tracker</li>
                        </div>
                    </ul>
                </div>
            )
    }
}

export default Main_Hub