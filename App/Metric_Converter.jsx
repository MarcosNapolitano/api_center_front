import { useState } from "react"
import LINK from "./Link.jsx"



function Metric_Converter({back}){

    const [state, setState] = useState("Please submit the value you wish to convert")

    async function convert(e){

        e.preventDefault()
        const number = e.target[0].value
        const unit = e.target[1].value
        const consulta = await fetch(`${LINK}/api/convert/convert?input=${number}${unit}`)
        const result = await consulta.json()

        setState(result.string)
    }

    return (<div>
                <h1>Metric Converter</h1>
                <form id="metric_form" onSubmit={convert}>
                    <input id="metric_number" name="number" type="number" placeholder="Please insert value..."/>
                    <select id="metric_units" name="units">
                        <option value="l">Liters</option>
                        <option value="km">Kilometers</option>
                        <option value="kg">Kilograms</option>
                        <option value="gal">Gallons</option>
                        <option value="lbs">Pounds</option>
                        <option value="mi">Miles</option>
                    </select>
                    <input type="submit" value="Convert!" />
                </form>
                <p id="metric_result">{state}</p>
                <button onClick={back}>Return To Hub</button>

            </div>)
    
}

export default Metric_Converter