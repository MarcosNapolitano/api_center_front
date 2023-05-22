function manual_reset(elements,label=false){
   
    for(let i in elements){
        if(!label){
            
            document.getElementById(elements[i]).value=""
 
        }else{

            document.getElementById(elements[i]).innerHTML=""

        }
    }

    return "ready"
}

export default manual_reset