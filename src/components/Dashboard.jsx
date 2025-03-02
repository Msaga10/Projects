import React, { useEffect, useState } from "react"; 
import AddItem from "./AddItem";
import db_service from "../appwrite/dbConfig";
import authService from "../appwrite/auth";
import { useSelector } from "react-redux";


function Dashboard() {

    const [isAddItemOpen,setIsAddItemOpen] = useState(false)
    const [lots, setLots] = useState([])
    const [lotId, setLotId] = useState([])
    const [amount, setAmount] = useState([])
    const [bidStatuses, setBidStatuses] = useState([]);
    const [products, setProducts] = useState(true)
    const [myBids, setMyBids] = useState(false)
    const [profile, setProfile] = useState(false)

    const openAddItem = () => setIsAddItemOpen(true)
    const closeAddItem = () => setIsAddItemOpen(false)

    const list = async () => {
        const user = await authService.getCurrentUser()
        const userId = user.$id
        // console.log(userId);
        try{
            const response = await db_service.getLots("userId",userId)
            const documents = response.documents
            if(Array.isArray(documents) && documents.length > 0){
                const list = []
                documents.forEach(doc => {
                    list.push(doc.$id)
                    console.log(doc.$id);
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
            console.log(result.documents);
            
        } else {
            console.error("Unexpected result structure:", result);
        }
    }
    
    const currentBid = async () => {
        const abc  = []
        for(let i = 0; i < lotId.length; i++){
            const response = await db_service.getBids("lot_id",lotId[i])
            if(response.documents && response.documents.length > 0){
                const lastBid  = response.documents[response.documents.length - 1]
                console.log(i, lastBid.bid_amount);
                
                abc.push(lastBid.bid_amount)
            }else {
                abc.push(null);
            }
        }
        setAmount(abc)
    }


    const statuses = useSelector((state) => state.bid.bidStatus);
    const toggleBids = ()=>{
        if (statuses && Array.isArray(statuses) && statuses.length > 0) {
                setBidStatuses(statuses); 
        }
        setMyBids(!myBids)
        if(!myBids){
            setProducts(false)
            setProfile(false)
        }
    }

    const toggleProducts = async ()=>{
        await getLots()
        setProducts(!products)
        if(!products){
            setMyBids(false)
            setProfile(false)
        }
    }
    useEffect(() => {
        toggleBids()
    }, [])
    
    useEffect(() => {
        toggleProducts()
    }, []);  
    
    useEffect(() => {
        if (lotId.length > 0) {
            currentBid();  
        }
    }, [lotId]); 
    
    return (
        <div className="h-screen bg-light-blue">
            
            <div className="flex gap-2 p-2 ">
                <button onClick={toggleProducts} >Products</button>|
                <button onClick={toggleBids}>My Bids</button>|
                <button>Profile</button>
                <button onClick={openAddItem} className="px-2 bg-blue-300 rounded">Add Item</button>
                <AddItem isOpen={isAddItemOpen} onClose={closeAddItem} />    
            </div>
            <hr />
            <div>
                {myBids && (
                <div>
                    {bidStatuses.map((statusObj, index) => (
                        <div key={index}>
                    <p className="break-words">{`Name: ${statusObj.Name} - ${statusObj.status}`}</p>
                    </div>
                ))}
                </div>)}
                {products && (<div className="p-4">
                    <table className="min-w-full ">
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
                </div>)}
            </div>
            
        </div>
    );
}

export default Dashboard;