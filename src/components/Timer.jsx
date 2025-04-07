import React from "react";
import Countdown from "react-countdown";

function Timer({ startDate, endDate, bidAmount }) {
   
    const convertToIST = (dateString) => {
        const date = new Date(dateString);
       
        return date.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });
    };
    
    const adjustStartDateToIST = (startDateString) => {
        const date = new Date(startDateString);
        date.setHours(date.getHours() - 5);  
        date.setMinutes(date.getMinutes() - 30);
        return date.getTime();
    };
   
    const adjustEndDateToIST = (endDateString) => {
        const date = new Date(endDateString);
        date.setHours(23);  
        date.setMinutes(59);
        date.setSeconds(59);
        return date.getTime();
    };
    
    const startTime = adjustStartDateToIST(startDate);
    const endTime = adjustEndDateToIST(endDate);
    const currentTime = Date.now();
    
    const renderer = ({ days, hours, minutes, completed }) => {
        if (completed) {
            return <span>Time's up</span>;
        } else {
            return (
                <span>
                    {days} days, {hours} hr, {minutes} min
                </span>
            );
        }
    };
    
    // Check if the auction hasn't started yet
    if(startTime > currentTime){
        return (
            <div className="text-sm bg-blue-500 p-[2px] rounded">
                <h3 className="animate-pulse">Starts in:</h3>
                <Countdown date={startTime} renderer={renderer} />
            </div>
        );
    }
    // Check if the auction is active
    else if(endTime > currentTime){
        return (
            <div className="text-sm bg-green-500 p-[2px] rounded">
                <h3 className="animate-pulse">Ends in:</h3>
                <Countdown date={endTime} renderer={renderer} />
            </div>
        );
    }
    // Auction has ended
    else{
        return (
            <p className="text-white p-1">
                {bidAmount ? "Sold!" : "Unsold"}
            </p>
        );
    }
}

export default Timer;