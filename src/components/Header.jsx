import React, { useState, useEffect } from "react";
import Logo1 from "../assets/Logo1.png";
import LogedInUser from "./LogedInUser";
import { NavLink } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
import authService from "../appwrite/auth";
import db_service from "../appwrite/dbConfig";
import { setBidStatus, setWinnerStatus } from "../store/bidSlice";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const winnerStatus = useSelector((state) => state.bid.winnerStatus);
    const [userBids, setUserBids] = useState([]);
    const [userLotStatus, setUserLotStatus] = useState({});
    const dispatch = useDispatch();

    const adjustEndDateToLastMoment = (endDateString) => {
        const date = new Date(endDateString);
    
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
    
        return date.getTime(); 
    };

    useEffect(() => {
        const checkUserBids = async () => {
            try {
                const user = await authService.getCurrentUser();
                const userId = user.$id;
    
                const response = await db_service.getBids("user_id", userId);
                const bids = response.documents;
                const bidStatuses = [];
                const processedLotIds = new Set();
                // console.log("Fetched Bids:", bids);
    
                if (bids.length > 0) {
                    for (let bid of bids) {
                        const lot = await db_service.getLot(bid.lot_id);
                        const adjustedEndDate = adjustEndDateToLastMoment(lot.end_date);
                    const auctionEndDate = adjustedEndDate;
    
                        let status1;
                        if (auctionEndDate < Date.now()) {
                            const lotBids = await db_service.getBids("lot_id", bid.lot_id);
                            const highestBid = lotBids.documents.reduce((maxBid, currentBid) =>
                                currentBid.bid_amount > maxBid.bid_amount ? currentBid : maxBid
                            );
    
                            if (highestBid.user_id === userId) {
                                status1 = "You have won the auction 🏆";
                            } else {
                                status1 = "You lose the auction";
                            }
                        } else {
                            const activeBids = await db_service.getBids("lot_id", bid.lot_id);
                        const highestActiveBid = activeBids.documents.reduce((maxBid, currentBid) =>
                            currentBid.bid_amount > maxBid.bid_amount ? currentBid : maxBid
                        );
                        if (highestActiveBid.user_id === userId) {
                            continue;
                        } else {
                            status1 = "You have been outbid";
                        }
                        }
    
                        if (status1 && !processedLotIds.has(bid.lot_id)) {
                            // console.warn("STATUS: ", status1);
                            processedLotIds.add(bid.lot_id);
                            bidStatuses.push({lotid: bid.lot_id, userId: bid.user_id, Name: lot.item_name, status: status1 });
                            console.log(bid.lot_id,lot.item_name,status1);
                            
                        }
                    }
                    
                    if (bidStatuses.length > 0){
                        // console.log("Bid Statuses before dispatch:", bidStatuses);
                        dispatch(setBidStatus(bidStatuses));
                    }
                } else {
                    console.warn("No bids found for user.");
                }
            } catch (error) {
                console.error("Error fetching user bids:", error);
            }
        };
    
        if (authStatus) {
            checkUserBids(); // Run the function when user is logged in
        }
    }, [authStatus, dispatch]);
    

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
        },
        {
            name: "Signup",
            slug: "/Signup",
            active: !authStatus,
        },
    ];

    return (
        <header className="flex h-auto gap-2 p-2 bg-dark-blue sticky top-0 z-10">
            <NavLink to="/">
                <img src={Logo1} alt="Logo" className="h-10 rounded-full " />
            </NavLink>

            {!authStatus && (
                <span className="px-2 py-[3px] h-min my-auto bg-gray-500 rounded-full ">
                    <NavLink
                        to="/Login"
                        className={({ isActive }) =>
                            `${isActive ? "hidden" : ""}  `
                        }
                    >
                        {" "}
                        <p className="text-white"> Login</p>
                    </NavLink>
                </span>
            )}

            <div className="flex items-center justify-center gap-5 my-auto ml-auto me-5">
                {authStatus !== undefined && (
                    <div className="flex gap-5">
                        <Notification />
                        <LogoutBtn />
                    </div>
                )}
                <LogedInUser className="" />
            </div>
        </header>
    );
}

export default Header;
