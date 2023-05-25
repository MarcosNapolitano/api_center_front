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
                <h2>Metric Converter</h2>
                <p id="main_grid_exp">   
                    This is a simple <b>Metric Converter</b>, just insert the number, select the unit and convert!
                </p>
                <form id="metric_form" onSubmit={convert}>

                    <input className="metric" id="metric_number" name="number" 
                           type="number" placeholder="Please insert value..."/>

                    <select className="metric" id="metric_units" name="units">
                        <option value="l">Liters</option>
                        <option value="km">Kilometers</option>
                        <option value="kg">Kilograms</option>
                        <option value="gal">Gallons</option>
                        <option value="lbs">Pounds</option>
                        <option value="mi">Miles</option>
                    </select>
                    <br />
                    <input className="metric" type="submit" value="Convert!" />
                </form>
                <p id="metric_result">{state}</p>
                <button className="metric" onClick={back}>Return To Hub</button>

            </div>)
    
}

export default Metric_Converter