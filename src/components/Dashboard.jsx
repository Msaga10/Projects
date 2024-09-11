import React, { useState } from "react";
import Header from "./Header";
import AddItem from "./AddItem";

// const [row, setRow] = useState([])
// const abc = () => {
//     setRow([])
// }

const bottomline = ()=>{
    
}

function Dashboard() {

    const [isAddItemOpen,setIsAddItemOpen] = useState(false)

    const openAddItem = () => setIsAddItemOpen(true)
    const closeAddItem = () => setIsAddItemOpen(false)

    return (
        <div className="h-screen bg-light-blue">
            
            <div className="flex gap-2 p-2 ">
                <button onClick={bottomline}>Products</button>
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
                                    Product
                                </th>
                                <th className="px-4 py-2 text-left">
                                    Name
                                </th>
                                <th className="px-4 py-2 text-left">
                                    Price
                                </th>
                                <th className="px-4 py-2 text-left">
                                    Catagory
                                </th>
                                <th className="px-4 py-2 text-left">
                                    age
                                </th>
                                <th className="px-4 py-2 text-left">
                                    Status
                                </th>
                                <th className="px-4 py-2 text-left">
                                    Added On
                                </th>
                                <th className="px-4 py-2 text-left">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="">
                                <td className="px-4 py-2">Row 1, Cell 1</td>
                                <td className="px-4 py-2">Row 1, Cell 2</td>
                                <td className="px-4 py-2">Row 1, Cell 3</td>
                                <td className="px-4 py-2">Row 1, Cell 3</td>
                                <td className="px-4 py-2">Row 1, Cell 3</td>
                                <td className="px-4 py-2">Row 1, Cell 3</td>
                                <td className="px-4 py-2">Row 1, Cell 3</td>
                                <td className="px-4 py-2">Row 1, Cell 3</td>
                            </tr>
                        
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
    );
}

export default Dashboard;
