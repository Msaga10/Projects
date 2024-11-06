import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { useSelector } from "react-redux";
import db_service from "../appwrite/dbConfig";
import { useDispatch } from "react-redux";
import { addBid } from "../store/bidSlice";
import { useParams } from "react-router-dom";

function MakeBid({isOpen, onClose}){

    const {register, handleSubmit} = useForm()
    const userData = useSelector((state)=>state.auth.userData)
    const {LotId} = useParams()
    
    const dispatch = useDispatch()
    
    // const lastBidId = useSelector((state)=>state.bids.lastBidId)

    const submitBid = async (data) => {
        console.log(userData);
        console.log(LotId);
        data.lot_id = LotId
        const id9 = userData.$id
        const time  = Date.now()
        console.log(time);
        if (data.bid_amount) {
            data.bid_amount = parseInt(data.bid_amount, 10);
        }
        console.log(data.bid_amount);
        
        
        data.bid_time = new Date(time).toISOString()
        data.user_id = id9
        data.status = "pending"
        // data.lot_id = lot_Id 
        // data.lastBidId = lastBidId || null
        const response = await db_service.createBid(data)
        // const bid_id = response.$id
        dispatch(addBid(response))
        console.log(response);
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