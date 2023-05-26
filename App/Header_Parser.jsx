import { useState } from "react"
import LINK from "./Link.jsx"



function Header_Parser({back}){

    const [state, setState] = useState(false)

    return (<div>
                <h2>Header Parser</h2>
                <p id="main_grid_exp">   
                    This App will show your HTTP request header info.
                    <br />
                    Everytime you make a request on the internet, this info gets sended.
                    <br />
                    Press "Click Here!" to see the magic.
                </p>
                <Api_Result state={state}/>
                
                <button className="button_header_parser" 
                        onClick={()=>setState(!state)}>Click Here!</button>

                <button className="button_header_parser" 
                        onClick={back}>Return To Hub</button>
            </div>)
    
}

function Api_Result({state}){

    const [data, setData] = useState([])

    async function getData(){
        
        const result = await fetch(LINK + "/api/whoami/myinfo")
        const result2 = await result.json()

        //react doesn't support objects natively so I iterate later over an array
        const arr = []
        
        for(let i in result2){
            arr.push([i,result2[i]])
        }

        setData(arr)
    }

    if(state){
        getData()
        return(<div>{data.map(data=>
                <p key={data}>
                    <b>{data[0][0].toUpperCase()+data[0].slice(1)}:</b>
                    <br/>
                    {data[1]}
                </p>)}
            </div>)
    }

    return(<p></p>)
}

export default Header_Parser