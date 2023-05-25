import { useState } from "react"
import LINK from "./Link.jsx"
import manual_reset from "./manual_reset.js"



function URL_Shortener({back}){

    const [state, setState] = useState(false)


    async function makePost(e){

        //this function prevents the default action of the submit event
        e.preventDefault()

        //now I can write what I need
        const data = {url:e.target["link_url"].value}
        const request = {method:"POST", headers:{ "Content-Type": "application/json"}, body: JSON.stringify(data)}        
        const consulta = await fetch(`${LINK}/api/urlshortener`,request).catch((e)=>e? console.log(e):undefined)
        const result = await consulta.json().catch((e)=>e? console.log(e):undefined)

        //manually reset the form!
        manual_reset(["link_url"])

        setState(result.short_url)  
        
        return result

    }

    async function getLink(e){
        
        e.preventDefault()
        const number = e.target["link_number"].value;
        const result = await fetch(`${LINK}/api/urlshortener/lastid`).catch((e)=>e? console.log(e):undefined)
        const result2 = await result.json().catch((e)=>e? console.log(e):undefined)

        //redirects to api endpoint simulating the http response
        //can't use fetch here CORS won't let me

        if (number>result2.last_id){
            return document.getElementById("link_exp").innerHTML="That number has not been submitted yet..."
        }else{
            //si la URL no existe no hay aviso acá, tengo que encontrar un punto medio
            return window.location.replace(`${LINK}/api/urlshortener/${number}`)
        }

    }
    
    return (<div>
                <h2>URL Shortener</h2>
                <p id="main_grid_exp">   
                    This App will let you post a link to website and then give you an <b>id</b> number.
                    <br />
                    Whenever you come back, you can submit that <b>id</b> number in the second field
                    to visit the original link. 
                </p>
                <form id="link_form_post" onSubmit={makePost}>
                    
                    <input className="url" type="url" id="link_url" placeholder="https://www.google.com"/>
                    <input className="url" type="submit" value="Post Link!" />
                                       
                </form>

                <form id="link_form_redirect" onSubmit={getLink}>
                    
                    <input className="url" type="number" id="link_number" placeholder="Submit a link number..." />
                    <input className="url" type="submit" value="Go!" />
                                       
                </form>
                <URL_result state={state}/>
                <button className="url" onClick={back}>Return To Hub</button>
            </div>)
    
}

function URL_result({state}){
    if(!state){
        
        return(<p id="link_exp">Please submit an URL and you will get a number!</p>)
    }else{

        return(<p id="link_exp">Your link number is {state}! Try submitting it in the form above!</p>)
    }
}

export default URL_Shortener

