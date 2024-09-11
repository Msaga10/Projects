import React,{useState,useEffect,useRef} from 'react'


function Countdown() {

    
    const [count,setCount]=useState(0);
    // const [isRunning,setIsRunning]=useState(false)
    // const intervalRef = useRef(null)
    
    useEffect(()=>{
        setTimeout(() => {
            setCount(count=>count + 1)
        }, 2000);      
    },[])
    
    
    return (
    <div>
      <h1 className=''>{count}</h1>
      {/* <button onClick={abc}>start</button> */}
    </div>
  )
}

export default Countdown
