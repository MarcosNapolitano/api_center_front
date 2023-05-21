import { useState } from "react"
import LINK from "./Link.jsx"


function URL_Shortener({back}){

    const [state, setState] = useState(false)


    async function makePost(e){

        //this function prevents the default action of the submit event
        e.preventDefault()

        //now I can write what I need
        const data = {url:e.target["link_url"].value}
        const request = {method:"POST", headers:{ "Content-Type": "application/json"}, body: JSON.stringify(data)}        
        const consulta = await fetch(`${LINK}/api/urlshortener`,request)
        const result = await consulta.json()

        //manually reset the form!
        document.getElementById("link_url").value=""

        setState(result.short_url)  
        
        return result

    }

    async function getLink(e){
        
        e.preventDefault()
        const number = e.target["link_number"].value;
        const result = await fetch(`${LINK}/api/urlshortener/lastid`)
        const result2 = await result.json()

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
                <h1>URL Shortener</h1>
                <form id="link_form_post" onSubmit={makePost}>
                    
                    <input type="url" id="link_url" placeholder="https://www.google.com/"/>
                    <button value="test">Post Link!</button>
                                       
                </form>

                <form id="link_form_redirect" onSubmit={getLink}>
                    
                    <input type="number" id="link_number" placeholder="Submit a link number..." />
                    <button value="test">Go!</button>
                                       
                </form>
                <URL_result state={state}/>
                <button onClick={back}>Return To Hub</button>
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

