import notificationImg from "../assets/notification-24.png"
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Notification() {
    const statuses = useSelector((state) => state.bid.bidStatus);
    console.log("notifiaction status:", statuses)
    const [delayedStatuses, setDelayedStatuses] = useState([]);
    
    useEffect(() => {
        if (statuses && statuses.length > 0) {
            const timer = setTimeout(() => {
                setDelayedStatuses(statuses); // Set the statuses after a delay
            }, 9000); // Delay in milliseconds (2000ms = 2 seconds)

            return () => clearTimeout(timer); // Cleanup the timer when component unmounts or changes
        }
    }, [statuses]); // Trigger this effect when 'statuses' change

    if (!delayedStatuses || delayedStatuses.length === 0) return null;
    return(
        <div>
            {delayedStatuses.map((statusObj, index) => (
                <div key={index}>
                    <style>
                        {`
                            @keyframes blink {
                                0%, 100% {
                                    opacity: 1;
                                }
                                50% {
                                    opacity: 0;
                                }
                            }
                            .animate-blink {
                                animation: blink 2s infinite;
                            }
                        `}
                    </style>
                    <div className="animate-blink text-red-500 flex">
                        <img src={notificationImg} alt="notification_img" />
                        <p className="break-words">{`"Lot Id:" ${statusObj.lotId} - ${statusObj.status}`}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default Notification