import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import db_service from "../appwrite/dbConfig";
import storage_service from "../appwrite/storageConfig";
import conf from "../conf/conf";
import Timer from "./Timer";

function Card({ filters }) {
    const [users, setUsers] = useState([]);
    const [bidData, setBidData] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);


    const getLotData = async () => {
        try {
            const response = await db_service.getLots("status", "active");
            // console.log(response.documents);
            return response.documents;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const filterData = async () => {
        const response = await getLotData();
        // console.log(response);
        if (response && Array.isArray(response)) {
            const filteredUser = response.filter(user => {
                const isCategoryValid = filters.categories.length === 0 || filters.categories.includes(user.category)
                const isYearValid = filters.years.length === 0 || filters.years.some(year => {
                    const userAge = user.old
                    if(year === '<1') return userAge <= 1
                    if(year === '<3') return userAge <= 3
                    if(year === '<5') return userAge <= 5
                    if(year === '<10') return userAge <= 10
                    return false
                })
                return isCategoryValid && isYearValid
            })
            setUsers(filteredUser);
        } else {
            console.error("Unexpected result structure:", users);
        }
        // console.log(users);
    };

    const getImageUrl = async () => {
        let imageUrl = [];
        for (let i = 0; i < users.length; i++) {
            const urls = users[i].imageUrls;
            if (Array.isArray(urls) && urls.length > 0) {
                imageUrl.push(urls[0]); // This gives 1st image of each lot (out of 3 images)
            }
        }
        // console.log(imageUrl);

        if (Array.isArray(imageUrl) && imageUrl.length > 0) {
            try {
                const fileUrls = [];
                for (let i = 0; i < imageUrl.length; i++) {
                    const fileId = JSON.parse(imageUrl[i]);
                    // console.log(fileId);
                    const response = await storage_service.getFiles(fileId);
                    // console.log(response);
                    const bucketId = response.bucketId;
                    // console.log(bucketId);
                    const file_Id = response.$id;
                    // console.log(file_Id);
                    const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${file_Id}/view?project=${conf.appwriteProjectId}`;
                    fileUrls.push(fileUrl);
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

    const getBidData = async () => {
        try {
            const allBids = [];
            for (let i = 0; i < users.length; i++) {
                const response = await db_service.getBids("lot_id",users[i].$id);
                // console.log(i, response)
                if (response.documents && response.documents.length > 0) {
                    const lastBid =
                        response.documents[response.documents.length - 1];
                    allBids.push(lastBid);
                    
                } else {
                    allBids.push(null);
                    // console.log("No bids for lot", users[i].$id);
                }
            }
            // console.log(allBids);
            setBidData(allBids);
            // setLoadingAmount(false);
            setIsDataLoaded(true);
        } catch (error) {
            console.error("Error fetching bid data:", error);
            // setLoadingAmount(false);
            setIsDataLoaded(true);
        }
    };


    useEffect(() => {
        filterData();
    }, [filters]);
    useEffect(() => {
        if (users.length > 0) {
            getBidData();
        }
    }, [users]);
    useEffect(() => {
        if (users.length > 0) {
            getImageUrl();
        }
    }, [users]);

    if (!isDataLoaded || !users.length) {
        return <div>Loading...</div>;
    }
    return (
        <span>
            <div className="flex flex-wrap gap-3">
                {imageUrls.map((value, index) => {
                    const user = users[index]; 
                    if (!user) return null;
                    return (
                    <NavLink
                        key={users[index].$id}
                        to={`/ItemDetailPage/${users[index].$id}`}
                        className="flex flex-wrap gap-3"
                    >
                        <div
                            key={users[index].$id}
                            className="w-[190px] h-[300px] bg-purple-400  flex flex-col  relative  rounded-xl overflow-hidden "
                        >
                            <img
                                src={value}
                                key={index}
                                alt="picture"
                                className="absolute top-0  w-[190px] h-[190px] object-cover rounded "
                            />
                            <div className="mt-[190px] relative flex flex-col items-center w-full h-full p-2">
                                <h2 className="text-center">
                                    <strong>
                                        {users[index].item_name}
                                    </strong>
                                </h2>
                                <p className="text-center">
                                    {users[index].old} Old
                                </p>
                                <div className="absolute bottom-0 left-0 p-2 text-lg">
                                    {bidData[index] ? bidData[index]?.bid_amount : users[index].base_amount}
                                </div>
                                <div className="absolute bottom-0 right-0 text-lg bg-blue-500 rounded m-1">
                                    {new Date(users[index].end_date).getTime() < Date.now() && bidData[index]?.bid_amount 
                                    ? <span className="bg-gray-600 px-2 rounded">Sold!</span>
                                    :
                                    <Timer
                                        startDate={users[index].start_date}
                                        endDate={users[index].end_date}
                                    />
                                    }
                                </div>
                            </div>
                        </div>
                    </NavLink>
                    )
})}
            </div>
        </span>
    );
}

export default Card;
