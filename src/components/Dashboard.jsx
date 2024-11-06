import React, { useEffect, useState } from "react";  //checkpoint
import Header from "./Header";
import AddItem from "./AddItem";
import db_service from "../appwrite/dbConfig";
import authService from "../appwrite/auth";

// const [row, setRow] = useState([])
// const abc = () => {
//     setRow([])
// }

// const bottomline = ()=>{   
// }

function Dashboard() {

    const [isAddItemOpen,setIsAddItemOpen] = useState(false)
    const [lots, setLots] = useState([])

    const openAddItem = () => setIsAddItemOpen(true)
    const closeAddItem = () => setIsAddItemOpen(false)

    const list = async () => {
        const user = await authService.getCurrentUser()
        const userId = user.$id
        // console.log(userId);
        
        try{
            const response = await db_service.getLots("userId",userId)
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
        } else {
            console.error("Unexpected result structure:", result);
        }
    }
    
    useEffect(()=>{
        getLots();
    },[])
    
    return (
        <div className="h-screen bg-light-blue">
            
            <div className="flex gap-2 p-2 ">
                <button 
                // onClick={bottomline}
                >Products</button>
                <button>My Bids</button>
                <button>Profile</button>
                <button onClick={openAddItem} className="px-2 bg-blue-300 rounded">Add Item</button>
                <AddItem isOpen={isAddItemOpen} onClose={closeAddItem} />    
            </div>
            <hr />
            <div>
                <div className="p-4">
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
                                    Current Price
                                </th>
                                <th className="px-4 py-2 text-left">
                                    Status
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {lots.map((lot)=>(
                            <tr className="" key={lot.old}>
                                <td className="px-4 py-2">{lot.item_name}</td>
                                <td className="px-4 py-2">{lot.base_amount}</td>
                                <td className="px-4 py-2">{new Date(lot.$createdAt).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{new Date(lot.start_date).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{new Date(lot.end_date).toLocaleDateString()}</td>
                                <td className="px-4 py-2">N/A</td>
                                <td className="px-4 py-2">N/A</td>
                            </tr>
                            ))}
                        
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
    );
}

export default Dashboard;
