import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db_service from "../appwrite/dbConfig";
import storage_service from "../appwrite/storageConfig";
import conf from "../conf/conf";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import MakeBid from "./MakeBid";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/lotSlice";

function ItemDetailPage() {
    const [userData, setUserData] = useState(null);
    const [lotData, setLotData] = useState(null);
    const [bidData, setBidData] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [image, setImage] = useState(imageUrls[0]);
    const [isAddItemOpen, setIsAddItemOpen] = useState(false);
    const [winner, setWinner] = useState("");

    const dispatch = useDispatch();

    const { LotId } = useParams();
    // console.log(LotId);

    const updateImage = (e) => {
        setImage(e);
    };

    const getLotData = async () => {
        try {
            const response = await db_service.getLot(LotId);
            setLotData(response);
        } catch (error) {
            console.error("Error fetching lot data:", error);
        }
    };

    const getBidData = async () => {
        try {
            const response = await db_service.getBids("lot_id", LotId);
            if (response.documents && response.documents.length > 0) {
                const lastBid =
                    response.documents[response.documents.length - 1];
                setBidData(lastBid);
            } else {
                setBidData(null);
            }
        } catch (error) {
            console.error("Error fetching bid data:", error);
        }
    };
    // console.log(bidData?.user_id);

    const url = [];
    const getImageUrl = async () => {
        const urls = [];
        urls.push(lotData.imageUrls);
        // console.log(urls);

        for (let i = 0; i < lotData.imageUrls.length; i++) {
            // url.push(urls[i])
            const fileId = JSON.parse(lotData.imageUrls[i]);
            // console.log(fileId);
            const response = await storage_service.getFiles(fileId);
            // console.log(response);
            const bucketId = response.bucketId;
            // console.log(bucketId);
            const file_Id = response.$id;
            // console.log(file_Id);
            const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${file_Id}/view?project=${conf.appwriteProjectId}`;
            url.push(fileUrl);
            // console.log(fileUrl);
        }
        setImageUrls(url);
        // console.log(url);
        if (url.length > 0) {
            setImage(url[0]);
        }
    };

    const closeAddItem = () => setIsAddItemOpen(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const openAddItem = async () => {
        const userDetails = await authService.getCurrentUser();
        // console.log(userDetails);
        if (userDetails) {
            if (
                Date.now() > new Date(lotData.start_date).getTime() &&
                Date.now() < new Date(lotData.end_date).getTime()
            ) {
                setIsAddItemOpen(true);
                dispatch(addItem({ lot_Id: LotId, user_Id: userDetails.$id }));
            } else {
                setIsDisabled(true);
                alert("Auction is not Live!");
            }
        } else {
            alert("Please Login!");
            setIsDisabled(true);
        }
    };

    const winnerName = async () => {
        if (new Date(lotData.end_date).getTime() <= Date.now()) {
            if (bidData && bidData.user_id) {
                const abc = bidData.user_id;
                console.log(abc);

                const winnername = await db_service.getUserDetails(
                    "user_id",
                    abc
                );
                console.log(winnername);

                if (winnername && winnername.documents.length > 0) {
                    // Set the winner's name if found
                    setWinner(winnername.documents[0].name);
                    console.log("Winner:", winnername.documents[0].name);
                }
                // console.log(winnername.documents[0].name);
                // console.log(winnername.documents[0].user_id);
            } else {
                setWinner("No bids placed");
            }
        } else {
            setWinner("Auction not ended yet");
        }
    };
    useEffect(() => {
        getLotData();
        getBidData();
    }, [LotId]);
    useEffect(() => {
        if (lotData && lotData.imageUrls) {
            getImageUrl(lotData.imageUrls);
        }
    }, [lotData]);
    useEffect(() => {
        if (lotData && bidData) {
            winnerName();
        }
    }, [lotData, bidData]);

    return (
        <div className="flex h-screen ">
            <div className="w-1/2 p-2 bg-white">
                <img
                    id="mainImg"
                    src={image}
                    alt="main image"
                    className=" h-[400px] p-3 m-auto rounded-xl"
                />
                <div className="flex justify-center gap-2 mx-auto p-2 m-2 bg-red-200 w-fit rounded-xl">
                    {imageUrls.map((value, index) => (
                        <div key={index}>
                            <div onClick={() => updateImage(value)}>
                                <img
                                    src={value}
                                    alt="watch image"
                                    className="h-[50px]"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1 px-10 text-black bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                <h2>
                    <strong>
                        Item Name: {lotData ? lotData.item_name : "Loading..."}
                    </strong>
                </h2>
                <p>
                    Discription: {lotData ? lotData.description : "Loading..."}
                </p>
                <hr /> <br />
                <h2>
                    <strong>product Details</strong>
                </h2>
                <div className="flex justify-between">
                    <ul>
                        <li>Price</li>
                        <li>Item Type</li>
                        <li>Catagory</li>
                        <li>Purchased Date</li>
                        <li>Old</li> <br />
                        <li>Srart On</li>
                        <li>Ends On</li>
                        {/* <li>Bill available</li>
                        <li>Box available</li>
                        <li>Accessories Avalable</li>
                        <li>In Warranty</li>
                        <li>Purchased On</li> */}
                    </ul>
                    <ul>
                        <li>{lotData ? lotData.base_amount : "Loading..."}</li>
                        <li>{lotData ? lotData.item_type : "Loading..."}</li>
                        <li>{lotData ? lotData.category : "Loading..."}</li>
                        <li>
                            {lotData
                                ? lotData.purchased_date.substring(0, 10)
                                : "Loading..."}
                        </li>
                        <li>{lotData ? lotData.old : "Loading..."}</li> <br />
                        <li>
                            {lotData
                                ? new Date(
                                      lotData.start_date
                                  ).toLocaleDateString()
                                : "Loading..."}
                        </li>
                        <li>
                            {lotData
                                ? new Date(
                                      lotData.end_date
                                  ).toLocaleDateString()
                                : "Loading..."}
                        </li>
                        {/* <li>$Bill available</li>
                        <li>$Box available</li>
                        <li>$Accessories Avalable</li>
                        <li>$In Warranty</li>
                        <li>$Purchased On</li> */}
                    </ul>
                </div>
                <br />
                <h2>
                    <strong>Seller Details</strong>
                </h2>
                <p>Name</p>
                <p>Email</p>
                <br />{" "}
                <div className="flex justify-between">
                    <h2>
                        <strong>Last Bid Amount</strong>
                    </h2>
                    <div>{bidData ? bidData.bid_amount : "No bids yet"}</div>
                </div>
                <button
                    onClick={openAddItem}
                    disabled={isDisabled}
                    className={`px-1  rounded-full ${
                        isDisabled ? `bg-gray-500` : `bg-blue-200`
                    }`}
                >
                    New Bid
                </button>
                <MakeBid isOpen={isAddItemOpen} onClose={closeAddItem} />
                <div>{winner ? `Winner Name: ${winner}` : null}</div>
            </div>
        </div>
    );
}

export default ItemDetailPage;
