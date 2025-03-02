import notificationImg from "../assets/notification-24.png";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Notification() {
    const statuses = useSelector((state) => state.bid.bidStatus);
    const [imageVisible, setImageVisible] = useState(false);

    const generateStatusesKey = (statuses) => {
        return Array.isArray(statuses) ? JSON.stringify(statuses) : ""; 
    };

    const handleClick = () => {
        alert("An Update! Go to 'my bids' in Dashboard")
        setImageVisible(false);
        localStorage.setItem("notificationViewed","true")
    }

    useEffect(() => {
        if (!Array.isArray(statuses) || statuses.length === 0) {
            setImageVisible(false);
            return;
        }
        const viewed = localStorage.getItem("notificationViewed") === "true"
        const previousStatusesKey = localStorage.getItem("previousStatusesKey");
        const currentStatusesKey = generateStatusesKey(statuses);

        if (currentStatusesKey !== previousStatusesKey && currentStatusesKey !== "") {  
            localStorage.removeItem("notificationViewed"); 
            localStorage.setItem("previousStatusesKey", currentStatusesKey);
            setImageVisible(true);            
        }else if(viewed){
            setImageVisible(false);
        }else{
            setImageVisible(true);
        }
    }, [statuses]); 

    
    if (!imageVisible) return null;

    return (
        <div>
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
                    {imageVisible && (
                    <div className="animate-blink text-red-500 flex">
                        <img src={notificationImg} alt="notification_img" onClick={handleClick}/>
                    </div>
                    )}
        </div>
    );
}

export default Notification;
