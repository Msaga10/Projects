import React from 'react'
import Countdown from "react-countdown";


function Timer({duration}) {

    
  
  // const countdownDate = Date.parse(duration)

  // const dateString = duration;
  const date = new Date(duration)
  const countdownDate = date.getTime()
  console.log(countdownDate);
  
  const isPastDate = countdownDate < Date.now();

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
      if(completed){
          return <span>Time's up</span>
      }else{
          return <span>{days} days, {hours} hours, {minutes} minutes left</span>
      }
  }
  
    
    
    return (
    <div>
      {isPastDate?(
        <p>date is passed!</p>
      ):(

        <Countdown date={countdownDate} renderer={renderer}/>
      )}
    </div>
  )
}

export default Timer
