import { useEffect } from "react";

const Second =(date,color)=>{
    useEffect(()=>{
        console.log(useEffect);
    },[color])
    const style={
        color:color?"tomato":"blue",
    };
  return(
    <div>
        <p style={style}> {date.toLocaleTimeString()}</p>
    </div>
  )  
}
export default Second;