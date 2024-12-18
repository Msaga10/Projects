import React from "react";
import Countdown from "react-countdown";

function Timer({ startDate, endDate }) {
    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();

    // const countdownDate = date.getTime()
    // console.log(countdownDate);

    // const isPastDate = countdownDate < Date.now();

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

    return (
        <div>
            {startTime > Date.now() ? (
                <div className="text-sm">
                    <p >Starts on:</p>
                    <p>{new Date(startDate).toLocaleString('en-GB',{
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}</p>
                </div>
            ) : endTime > Date.now() ? (
                <div className="text-sm">
                    <h3>Ends in</h3>
                    <Countdown date={endTime} renderer={renderer} />
                </div>
            ) : (
                <p>Sold out</p>
            )}
        </div>
    );
}

export default Timer;
