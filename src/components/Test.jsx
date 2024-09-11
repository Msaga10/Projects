import React, { useState } from 'react';
import bg1 from '../assets/bg-1.jpg'

const Test = () => {
  const [car,setCar] = useState({
    model:"r8",
    year:2012,
    color:"red"
  })
  function updateColor(){
    
    setCar((prev)=>{
      return{...prev, color:"blue"}
    })
  }
  return (
    // <div className="">
    //     <h2 className='font-roboto'>e Hello this is paragraph</h2>
    //     <h2 className='font-open-sans'>e Hello this is paragraph</h2>
    //     <h2 className='font-lato'>e Hello this is paragraph</h2>
    //     <h2 className='font-montserrat'>e Hello this is paragraph</h2>
    //     <h2 className='font-poppins'>e Hello this is paragraph</h2>
    //     <h2 className='font-anton'>e Hello this is paragraph</h2>
    // </div>
    <div>
      <h1>the color is of car {car.color}!</h1>
      <button onClick={updateColor}>blue</button>
      </div>
  );
};

export default Test;
