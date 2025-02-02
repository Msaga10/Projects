import React, { useEffect, useState } from "react";  //checkpoint
import Header from "./Header";
import AddItem from "./AddItem";
import db_service from "../appwrite/dbConfig";
import authService from "../appwrite/auth";
import { setBidStatus, setWinnerStatus } from "../store/bidSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


function Dashboard() {

    const [isAddItemOpen,setIsAddItemOpen] = useState(false)
    const [lots, setLots] = useState([])
    const [lotId, setLotId] = useState([])
    const [amount, setAmount] = useState([])
    const [user_id, setUser_id] = useState()
    const dispatch = useDispatch()
    const statuses = useSelector((state) => state.bid.bidStatus);

    const openAddItem = () => setIsAddItemOpen(true)
    const closeAddItem = () => setIsAddItemOpen(false)

    const list = async () => {
        const user = await authService.getCurrentUser()
        const userId = user.$id
        setUser_id(userId)
        // console.log(userId);
        
        try{
            const response = await db_service.getLots("userId",userId)
            const documents = response.documents
            if(Array.isArray(documents) && documents.length > 0){
                const list = []
                documents.forEach(doc => {
                    list.push(doc.$id)
                    // console.log(doc.$id);
                })
                setLotId(list)
            }
            return response
        }catch(error){
            console.error(error);
        }
    }
    // console.log(list());
    
    const getLots = async () => {
        const result = await list()
        if (result && Array.isArray(result.documents)) {
            setLots(result.documents)
            // console.log(result.documents);
            
        } else {
            console.error("Unexpected result structure:", result);
        }
    }
    
    // const currentBid = async () => {
    //     const abc  = []
    //     const user = await authService.getCurrentUser();
    //     const response = await db_service.getBids("user_id",user.$id)
    //     console.log("hello",response.documents);
    //     for(let i = 0; i < lotId.length; i++){
            
    //         console.log(lotId[0])
    //         if(response.documents && response.documents.length > 0){
    //             const lastBid  = response.documents[response.documents.length - 1]
    //             console.log(i, lastBid.bid_amount);
                
    //             abc.push(lastBid.bid_amount)
    //             // const user = await authService.getCurrentUser();
    //             // console.log(user);
                
    //             const userId = user_id;
    //             console.log(userId);
    //             if (lastBid.user_id !== userId) {
    //                 // User has been outbid
    //                 dispatch(setBidStatus("You have been outbid"));
    //                 console.log("dispatch bid status: you have been outbid")
    //             } else {
    //                 // User placed the highest bid (optional)
    //                 dispatch(setBidStatus("You have placed the highest bid"));
    //             }
    //         }else {
    //             abc.push(null);
    //         }
    //     }
    //     setAmount(abc)
    // }

    const currentBid = async () => {
        const abc = [];
        const user = await authService.getCurrentUser();
        const userId = user.$id;
        
        // Fetch all bids by the current user
        const response = await db_service.getBids("user_id", userId);
        // console.log("Fetched bids by current user:", response.documents);
        
        if (!response.documents || response.documents.length === 0) {
            console.log("No bids found for current user.");
            return;
        }
    
        // Iterate through the current user's bids
        for (let i = 0; i < response.documents.length; i++) {
            const userBid = response.documents[i];
            const lotId = userBid.lot_id; // Lot ID of the current user's bid
            // console.log(lotId)
            // Fetch all bids for the current lot (lot_id)
            const lotBidsResponse = await db_service.getBids("lot_id", lotId);
            // console.log("Fetched all bids for lot_id:", lotId, lotBidsResponse.documents);
    
            if (!lotBidsResponse.documents || lotBidsResponse.documents.length === 0) {
                console.log(`No bids found for lot_id: ${lotId}`);
                continue; // Skip if no bids found for this lot
            }

            // Assuming you have the lot data here with the auction end date
        const lot = lotBidsResponse.documents[0]; // assuming this is where lot data comes from
        
        const lot_id = lot.lot_id
        const abc1 = await db_service.getLot(lot_id)
        const abc2 = abc1.end_date
        // console.log("abc is",abc2)
        const auctionEndDate = new Date(abc2).getTime(); // Use lot's end date
        

            // Filter out only the bids made by the current user
        const userBidsForLot = lotBidsResponse.documents.filter(bid => bid.user_id === userId);
        // console.log("User's Bids for Lot:", userBidsForLot);
    
            // Sort all bids for the lot by bid amount (descending order) to get the highest bid
            const sortedBids = lotBidsResponse.documents.sort((a, b) => b.bid_amount - a.bid_amount);
            const highestBid = sortedBids[0]; // The highest bid for this lot
            
            // Store the highest bid amount for display (in your UI)
            if (!abc.some(bidAmount => bidAmount === highestBid.bid_amount)) {
                // Only add the highest bid once to abc
                abc.push(highestBid.bid_amount);
            }
        

            // Check if the current user's bid is the highest bid
            if (highestBid.user_id === userId) {
                // console.log("inside 'if 1'")
                // User has won the auction (his bid is the highest)
                if (auctionEndDate < Date.now()) {
                    // console.log("inside 'if 2'")
                    dispatch(setBidStatus("You have won the auction"));
                    console.log("Dispatch: You have won the auction");
                    dispatch(setWinnerStatus("won"));
                }
            } else {
                // User has been outbid, check if auction is still open
                if (auctionEndDate > Date.now()) {
                    dispatch(setBidStatus("You have been outbid"));
                    console.log("Dispatch: You have been outbid");
                    dispatch(setWinnerStatus("lost"));
                }
            }
        }
        // console.log(abc)
        setAmount(abc); // Update the amount state with the highest bid amounts
    };
    
    const addNewItem = (newItem) => {
        setLots((prevLots) => [...prevLots, newItem]);
    };
    
    useEffect(() => {
        const fetchData = async () => {
            await getLots();  
        };
    
        fetchData();
    }, []);  
    
    useEffect(() => {
        if (lotId.length > 0) {
            currentBid();  
        }
    }, [lotId]); 
    
    return (
        <div className="h-screen bg-light-blue">
            
            <div className="flex gap-2 p-2 ">
                <button 
                // onClick={bottomline}
                >Products</button>
                <button>My Bids</button>
                <button>Profile</button>
                <button onClick={openAddItem} className="px-2 bg-blue-300 rounded">Add Item</button>
                <AddItem isOpen={isAddItemOpen} onClose={closeAddItem} addNewItem={addNewItem} />    
            </div>
            <hr />
            <div>
                <div className="p-4 flow-x-auto">
                    <table className="min-w-full hidden md:block">
                        <thead>
                            <tr className="">
                                <th className="px-4 py-2 text-left">
                                    Item Name
                                </th>
                                <th className="px-4 py-2 text-left">
                                    Base Price
                                </th>
                                
                                <th className="px-4 py-2 text-left">
                                    Added On
                                </th>
                                <th className="px-4 py-2 text-left">
                                    Auction start on
                                </th>
                                <th className="px-4 py-2 text-left">
                                    Auction ends on
                                </th>
                                <th className="px-4 py-2 text-left">
                                    Last Bid
                                </th>
                                <th className="px-4 py-2 text-left">
                                    Status
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {lots.map((lot,index)=>(
                            <tr className="" key={lot.old}>
                                <td className="px-4 py-2">{lot.item_name}</td>
                                <td className="px-4 py-2">{lot.base_amount}</td>
                                <td className="px-4 py-2">{new Date(lot.$createdAt).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{new Date(lot.start_date).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{new Date(lot.end_date).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{amount[index] != null ? `${amount[index]}` : `N/A`}</td>
                                <td className="px-4 py-2">{amount[index] && new Date(lot.end_date).getTime() > Date.now() ? `Active` : `Inactive`}</td>
                            </tr>
                            ))}
                        
                        </tbody>
                    </table>
                    <div className="block md:hidden">
        {lots.map((lot, index) => (
            <div key={lot.old} className="bg-amber-100 p-4 rounded-md shadow mb-4">
                <h3 className="font-semibold">{lot.item_name}</h3>
                <p><strong>Base Price:</strong> {lot.base_amount}</p>
                <p><strong>Added On:</strong> {new Date(lot.$createdAt).toLocaleDateString()}</p>
                <p><strong>Auction Start:</strong> {new Date(lot.start_date).toLocaleDateString()}</p>
                <p><strong>Auction Ends:</strong> {new Date(lot.end_date).toLocaleDateString()}</p>
                <p><strong>Last Bid:</strong> {amount[index] != null ? `${amount[index]}` : `N/A`}</p>
                <p><strong>Status:</strong> {amount[index] && new Date(lot.end_date).getTime() > Date.now() ? `Active` : `Inactive`}</p>
            </div>
        ))}
    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Dashboard;
