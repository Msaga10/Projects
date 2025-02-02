import React, { useState, useEffect } from "react";
import Logo1 from "../assets/Logo1.png";
import LogedInUser from "./LogedInUser";
import { NavLink } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
import authService from "../appwrite/auth";
import db_service from "../appwrite/dbConfig";
import { setBidStatus, setWinnerStatus  } from "../store/bidSlice";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const bidStatus = useSelector((state) => state.bid.bidStatus);
    const winnerStatus = useSelector((state) => state.bid.winnerStatus);
    console.log("bid status:",bidStatus);
    const [userBids, setUserBids] = useState([]);
    const [userLotStatus, setUserLotStatus] = useState({});
    const dispatch = useDispatch()

    
    useEffect(() => {
        const checkUserBids = async () => {
            try {
                // Get current user
                const user = await authService.getCurrentUser();
                const userId = user.$id;

                // Fetch all bids placed by the current user
                const response = await db_service.getBids("user_id", userId);
                const bids = response.documents;
                const bidStatuses = []
                console.log("Fetched Bids:", bids)
                if (bids.length > 0) {
                    for (let bid of bids) {
                        const lot = await db_service.getLot(bid.lot_id);
                        const auctionEndDate = new Date(lot.end_date).getTime();

                        // if (auctionEndDate < Date.now()) {
                        //     // Auction has ended, check if the user's bid is the highest
                        //     const lotBids = await db_service.getBids("lot_id", bid.lot_id);
                        //     const highestBid = lotBids.documents.reduce((maxBid, currentBid) =>
                        //         currentBid.bid_amount > maxBid.bid_amount ? currentBid : maxBid
                        //     );

                        //     if (highestBid.user_id === userId) {
                        //         // dispatch(setBidStatus([{ lotId: bid.lot_id, status: "You have won the auction" }]));
                        //         bidStatus.push({ lotId: bid.lot_id, status: "You have won the auction" })
                        //         console.log("Dispatching Bid Status:", [{ lotId: bid.lot_id, status: "You have won the auction" }]);
                        //         // dispatch(setWinnerStatus({ lotId: bid.lot_id, status: "won" }));
                        //     } else {
                        //         // dispatch(setBidStatus([{ lotId: bid.lot_id, status: "You have been outbid" }]));
                        //         bidStatus.push({ lotId: bid.lot_id, status: "You have been outbid" })
                        //         // dispatch(setWinnerStatus({ lotId: bid.lot_id, status: "lost" }));
                        //     }
                        // } else {
                        //     // dispatch(setBidStatus({ lotId: bid.lot_id, status: "Your bid is still active" }));
                        //     bidStatus.push({ lotId: bid.lot_id, status: "Your bid is still active" })
                        // }
                        let status1 =   undefined
                        console.log("Checking lot:", lot);  // Log the lot info
                    console.log("Auction end date:", auctionEndDate); 
                        if (auctionEndDate < Date.now()) {
                            const lotBids = await db_service.getBids("lot_id", bid.lot_id);
                            const highestBid = lotBids.documents.reduce((maxBid, currentBid) =>
                                currentBid.bid_amount > maxBid.bid_amount ? currentBid : maxBid
                            );
                            console.log("Lot Bids:", lotBids);  // Log the bids for this lot
                            console.log("Highest Bid:", highestBid)
                            if (highestBid.user_id === userId) {
                                status1 = "You have won the auction";
                            } else {
                                status1 = "You have been outbid";
                            }
                        } else {
                            status1 = "Your bid is still active";
                        }
                        // console.log("Status for lot:", bid.lot_id, "is:", status1);
                        // Only push the status if it's not undefined
                        if (status1 !== undefined) {
                            bidStatuses.push({ lotId: bid.lot_id, status: status1 });
                            console.log({ lotId: bid.lot_id, status: status1 })
                        }
                    }
                }
                dispatch(setBidStatus(bidStatuses))
                console.log(bidStatuses)
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
                {authStatus && bidStatus !== undefined &&(
                    <div className="flex">
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
