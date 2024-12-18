import React, { useEffect, useState } from "react";
import Image from "../assets/watch.jpg";
import { NavLink } from "react-router-dom";
import authService from "../appwrite/auth";
import db_service from "../appwrite/dbConfig";
import storage_service from "../appwrite/storageConfig";
import conf from "../conf/conf";
import Timer from "./Timer";

const Amount = 100;

function Card({ $id, featuredImg }) {
    const [users, setUsers] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    const getLotData = async () => {
        // const response = await authService.getCurrentUser()
        // const userId = response.$id
        // console.log(userId);
        try {
            // const response = await db_service.getLots("userId",userId)
            const response = await db_service.getLots("status", "active");
            // console.log(response.documents);
            return response.documents;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    //      TODO
    // const CurrentBid = async () => {
    //     try {
    //         const response = await db_service.getBids("lot_id", LotId);
    //         const bidAmount = response.documents[0].bid_amount;
    //         console.log(bidAmount);
    //         return bidAmount
    //     } catch (error) {
    //         console.error('Error fetching bid data:', error);
    //     }
    // }

    const filterData = async () => {
        const response = await getLotData();
        console.log(response);
            if (response && Array.isArray(response)) {
                setUsers(response); 
            } else {
                console.error("Unexpected result structure:", users);
            }
        console.log(users);
    };

    const singleData = (call) => {  
        return users.map(user => user[call] || "Data is not available")
    };
    
    const getImageUrl = async () => {
        let imageUrl = []
        for(let i = 0; i < users.length; i++){
            const urls = users[i].imageUrls
            if (Array.isArray(urls) && urls.length > 0) {
                imageUrl.push(urls[0]); // This gives 1st image of each lot (out of 3 images)
            }
        }
        console.log(imageUrl);
        
        if (Array.isArray(imageUrl) && imageUrl.length > 0) {
            try {
                const fileUrls = []
                for(let i = 0; i < imageUrl.length; i++){
                    const fileId = JSON.parse(imageUrl[i]);
                    // console.log(fileId);
                    const response = await storage_service.getFiles(fileId);
                    // console.log(response);
                    const bucketId = response.bucketId;
                    // console.log(bucketId);
                    const file_Id = response.$id;
                    // console.log(file_Id);
                    const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${file_Id}/view?project=${conf.appwriteProjectId}`;
                    fileUrls.push(fileUrl)
                    // console.log(fileUrl);
                }
                setImageUrls(fileUrls);
            } catch (error) {
                console.error(error);
                return [];
            }
        }
        return [];
    };

    //checkpoint
    console.log(typeof(singleData("start_date")[0]));
    

    useEffect(() => {
        filterData();
    }, []);
    useEffect(() => {
        if (users.length > 0) {
            getImageUrl();
        }
        console.log("Updated users:", users)
    }, [users]);

    return (        
        <span>
            <div className="flex flex-wrap gap-3">
                {imageUrls.map((value, index)=>(
            <NavLink key={users[index].$id} to={`/ItemDetailPage/${users[index].$id}`} className="flex flex-wrap gap-3">
                    <div key={users[index].$id} className="w-[190px] h-[300px] bg-purple-400  flex flex-col  relative  rounded-xl overflow-hidden ">
                        <img
                            src={value}
                            key={index}
                            alt="picture"
                            className="absolute top-0  w-[190px] h-[190px] object-cover rounded "
                        />
                        <div className="mt-[190px] relative flex flex-col items-center w-full h-full p-2">
                            <h2 className="text-center">
                                <strong>
                                    {singleData("item_name")[index]}
                                </strong>
                            </h2>
                            <p  className="text-center">{singleData("old")[index]} Old</p>
                            <div className="absolute bottom-0 left-0 p-2 text-lg">
                                ₹{singleData("base_amount")[index]}
                            </div>
                            <div className="absolute bottom-0 right-0 px-1 text-lg bg-blue-500 rounded m-1">
                                {/* 15Hr 5Min Left */}
                                <Timer 
                                    startDate={singleData("start_date")[index]}
                                    endDate={singleData("end_date")[index]}
                                />
                            </div>
                        </div>
                    </div>
            </NavLink>
                ))} 
                </div>
        </span>
    );
}

export default Card;
