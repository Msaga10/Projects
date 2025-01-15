// import React from "react";
// import Countdown from "react-countdown";

// function Timer({ startDate, endDate }) {
//     const convertToIST = (dateString) => {
//         // Create a date object from the UTC string
//         const date = new Date(dateString);
        
//         // Set the time zone to Asia/Kolkata (IST)
//         return date.toLocaleString("en-IN", {
//             timeZone: "Asia/Kolkata",
//             year: "numeric",
//             month: "2-digit",
//             day: "2-digit",
//             hour: "2-digit",
//             minute: "2-digit",
//             second: "2-digit",
//             hour12: true,
//         });
//     };

//     const adjustStartDateToIST = (startDateString) => {
//         const date = new Date(startDateString);
//         // Add 5 hours and 30 minutes to convert UTC midnight to 5:30 AM IST
//         date.setHours(date.getHours() - 5);   // Add 5 hours
//         date.setMinutes(date.getMinutes() - 30);  // Add 30 minutes
//         return date.getTime();
//     };
    
//     // Adjust endDate if necessary
//     const adjustEndDateToIST = (endDateString) => {
//         const date = new Date(endDateString);
//         date.setHours(date.getHours() - 5);   // Add 5 hours
//         date.setMinutes(date.getMinutes() - 30);  // Add 30 minutes
//         return date.getTime();  // No changes needed for the end time
//     };
//     const startTime = adjustStartDateToIST(startDate);
//     const endTime = adjustEndDateToIST(endDate);

//     // const countdownDate = date.getTime()
//     // console.log(countdownDate);

//     // const isPastDate = countdownDate < Date.now();

//     const renderer = ({ days, hours, minutes, completed }) => {
//         if (completed) {
//             return <span>Time's up</span>;
//         } else {
//             return (
//                 <span>
//                     {days} days, {hours} hr, {minutes} min
//                 </span>
//             );
//         }
//     };

//     return (
//         <div>
//             {startTime > Date.now() ? (
//                 <div className="text-sm">
//                     <p>Starts on:</p>
//                     <p>
//                         {convertToIST(startDate)}
//                     </p>
//                 </div>
//             ) : endTime > Date.now() ? (
//                 <div className="text-sm bg-green-500">
//                     <h3 className="animate-pulse ">Ends in</h3>
//                     <Countdown date={endTime} renderer={renderer} />
//                 </div>
//             ) : (
//                 <p>Sold out</p>
//             )}
//         </div>
//     );
// }

// export default Timer;


///////////
import React from "react";
import Countdown from "react-countdown";

function Timer({ startDate, endDate }) {
    const convertToIST = (dateString) => {
        // Create a date object from the UTC string
        const date = new Date(dateString);
        
        // Set the time zone to Asia/Kolkata (IST)
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
        // Add 5 hours and 30 minutes to convert UTC midnight to 5:30 AM IST
        date.setHours(date.getHours() - 5);   // Subtract 5 hours
        date.setMinutes(date.getMinutes() - 30);  // Subtract 30 minutes
        return date.getTime();
    };
    
    // Adjust endDate if necessary
    const adjustEndDateToIST = (endDateString) => {
        const date = new Date(endDateString);
        date.setHours(date.getHours() - 5);   // Subtract 5 hours
        date.setMinutes(date.getMinutes() - 30);  // Subtract 30 minutes
        return date.getTime();  // No changes needed for the end time
    };

    const startTime = adjustStartDateToIST(startDate);
    const endTime = adjustEndDateToIST(endDate);

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
                <div className="text-sm p-1">
                    <p>Starts on:</p>
                    <p>
                        {/* Directly display adjusted start time */}
                        {new Date(startTime).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour12: true,
                        })}
                    </p>
                </div>
            ) : endTime > Date.now() ? (
                <div className="text-sm bg-green-500 p-[2px] rounded">
                    <h3 className="animate-pulse ">Ends in</h3>
                    <Countdown date={endTime} renderer={renderer} />
                </div>
            ) : (
                <p>Sold out</p>
            )}
        </div>
    );
}

export default Timer;
