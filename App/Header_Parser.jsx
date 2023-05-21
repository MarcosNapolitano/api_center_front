import { useState } from "react"
import LINK from "./Link.jsx"



function Header_Parser({back}){

    const [state, setState] = useState(false)

    return (<div>
                <h1>Header Parser</h1>
                <Api_Result state={state}/>
                <button onClick={()=>setState(!state)}>Click Here!</button>
                <button onClick={back}>Return To Hub</button>
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
        return(<div>{data.map(data=><p key={data}>{data[0]}<br/>{data[1]}</p>)}</div>)
    }

    return(<p></p>)
}

export default Header_Parser