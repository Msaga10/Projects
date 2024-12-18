import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { useSelector } from "react-redux";
import db_service from "../appwrite/dbConfig";
import { useDispatch } from "react-redux";
import { addBid } from "../store/bidSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";

function MakeBid({isOpen, onClose}){

    const {register, handleSubmit} = useForm()
    const [bidData, setBidData] = useState(null)
    const userData = useSelector((state)=>state.auth.userData)
    const {LotId} = useParams()
    
    const dispatch = useDispatch()

    const submitBid = async (data) => {
        // console.log(userData);
        // console.log(LotId);
        
        data.lot_id = LotId
        if (data.bid_amount) {
            data.bid_amount = parseInt(data.bid_amount, 10);
        }
        
        try {
            const response = await db_service.getBids("lot_id", LotId);
            if (response.documents && response.documents.length > 0) {
                const lastBid = response.documents[response.documents.length - 1];  
                setBidData(lastBid);
            } else {
                setBidData(null);  
            }
        } catch (error) {
            console.error('Error fetching bid data:', error);
        }
        setTimeout(()=>{
            console.log(bidData);
        },4000)
        let response
        if(bidData.bid_amount < data.bid_amount){
            const id9 = userData.$id
        const time  = Date.now()
        // console.log(time);
        // console.log(data.bid_amount);
        
        const abc = await db_service.getBids("lot_id",LotId)
        let lastBidId = null
        if (abc.documents && abc.documents.length > 0) {
            const lastBid = abc.documents[abc.documents.length - 1];
            lastBidId = lastBid.$id
        }
        
        data.bid_time = new Date(time).toISOString()
        data.user_id = id9
        data.status = "pending"
        data.previous_bid_id = lastBidId || null
        response = await db_service.createBid(data)
        dispatch(addBid(response))
        }else{
            alert("Amount should be greater then last bid!")
        }

        
        // console.log(response);
        onClose()
        return response   
    }


    if (!isOpen) {
        return null;
    }

    return (
    <div>
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"></div>
        <div className="fixed z-50 w-1/3 p-5 mx-auto my-auto bg-gradient-to-r from-red-400 to-blue-400  text-black rounded-lg shadow-lg inset-1/4 h-min">
            <h1>Make Your Bid</h1>
            <form action="" onSubmit={handleSubmit(submitBid)} >
                <input type="number" step="1" placeholder="Enter Bid Amount" className="rounded p-1" {...register("bid_amount", {required: true,})}/>
                <button type="submit" className="mx-2 bg-blue-300 px-1 rounded">Bid!</button>
            </form>
        <button onClick={onClose} className="absolute top-0 right-0 px-1 m-2 bg-red-600">X</button>
        </div>
    </div>)
}
export default MakeBid