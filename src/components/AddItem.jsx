import React, { useState } from "react";
import Input from "./Input";
import { useDispatch } from "react-redux";
import db_service from "../appwrite/dbConfig";
import storage_service from "../appwrite/storageConfig";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { addItem } from "../store/lotSlice";

function AddItem({ isOpen, onClose,addNewItem }) {
    const dispatch = useDispatch();
    const [errMsg, setErrMsg] = useState("");
    const { register, handleSubmit } = useForm();
    const [files, setFiles] = useState({
        img1: null,
        img2: null,
        img3: null,
    })
    const [imgPreview, setImgPreview] = useState({
        img1: null,
        img2: null,
        img3: null,
    });

    const handleImage = (e, key) => {
        console.log(key);
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImgPreview((prev) => ({ ...prev, [key]: imageUrl }));
            setFiles((prev) => ({...prev, [key]:file}))
        } else {
            console.log("error", key);
        }
    };

    const uploadFiles = async() => {
        const uploadedFileUrls = []
        for(const key in files){
            if(files[key]){
                console.log(files[key]);
                
                const response = await storage_service.uploadFile(files[key])
                console.log(response);
                const response1 = response.$id
                console.log(response1);
                const responseString = JSON.stringify(response1);
                console.log(responseString);
                uploadedFileUrls.push(responseString);
                
            }
        }
        console.log(uploadedFileUrls);
        
        return uploadedFileUrls;
    }


    const lotSubmit = async (data) => {
        setErrMsg("");

        try {
            // console.log(data);
            if (data.old) {
                data.old = parseInt(data.old, 10);
            }
            if (data.base_amount) {
                data.base_amount = parseInt(data.base_amount, 10);
            }


            const user = await authService.getCurrentUser();
            data.userId = user.$id;
            data.status = "active"

            const uploadedFileUrls = await uploadFiles()
            console.log(uploadedFileUrls);
            
            data.imageUrls = Array.isArray(uploadedFileUrls) ? uploadedFileUrls : [uploadedFileUrls]
            const response = await db_service.createLot(data);

            const uniqueId = response.$id
            console.log(uniqueId);
            
            dispatch(addItem({ ...data, id: uniqueId }));

            const totalChars = uploadedFileUrls.join('').length;
            console.log(totalChars);
    
            addNewItem({ ...data, id: uniqueId });
            onClose()
            return response;
        } catch (error) {
            setErrMsg(error);
            console.error(error);
        }
    };
    
    if (!isOpen) {
        return null;
    }
    
    return (
        <div>
            <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"></div>
            <div className="fixed z-50 w-auto sm:w-1/3 p-5 mx-auto my-auto bg-gradient-to-r from-red-400 to-blue-400  text-black rounded-lg shadow-lg inset-1/4 h-min">
                <form
                    onSubmit={handleSubmit(lotSubmit)}
                    className="flex flex-col gap-2 "
                >
                    <h1 className="text-center">Add Auction Item</h1>
                    <div className="flex gap-1">
                        <Input
                            type="text"
                            placeholder="Product Name"
                            className=" w-full"
                            {...register("item_name", {
                                required: true,
                            })}
                        />
                        <Input
                            type="text"
                            placeholder="Product Type"
                            className=" w-full"
                            {...register("item_type", {
                                required: true,
                            })}
                        />
                    </div>
                    <select
                        name=""
                        id=""
                        className=" rounded"
                        {...register("category", { required: true })}
                    >
                        <option value="category">Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Home & Garden">Home & Garden</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Collectibles">Collectibles</option>
                        <option value="Automotive">Automotive</option>
                        <option value="Sports & Outdoors">
                            Sports & Outdoors
                        </option>
                        <option value="Art & Crafts">Art & Crafts</option>
                        <option value="Toys & Games">Toys & Games</option>
                        <option value="Books & Media">Books & Media</option>
                        <option value="Health & Beauty">Health & Beauty</option>
                    </select>
                    <textarea
                        name=""
                        id=""
                        placeholder="Item Discription"
                        className="p-1 rounded"
                        {...register("description", { required: true })}
                    ></textarea>
                    <div className="flex gap-2 flex-wrap">
                        <h2>Purchased on*: </h2>
                        <Input
                            type="date"
                            className=""
                            {...register("purchased_date", { required: true })}
                        />
                    </div>
                    <div className="flex gap-2">
                        <h2>Item Age:</h2>
                        <Input
                            type="number"
                            // min="0"
                            step="1"
                            placeholder="Years"
                            className="w-16"
                            {...register("old", { required: true })}
                        />
                       
                    </div>
                    <div className="">
                        <div className="flex">
                            {" "}
                            <Input
                                type="file"
                                accept="image/*"
                                className="cursor-pointer"
                                onChange={(e) => handleImage(e, "img1")}
                            />
                            {imgPreview.img1 && (
                                <img
                                    src={imgPreview.img1}
                                    alt="Image Preview 1"
                                    className="w-14"
                                ></img>
                            )}
                        </div>
                        <div className="flex">
                            <Input
                                type="file"
                                accept="image/*"
                                placeholder="Product Name"
                                className="cursor-pointer"
                                onChange={(e) => handleImage(e, "img2")}
                            />
                            {imgPreview.img2 && (
                                <img
                                    src={imgPreview.img2}
                                    alt="Image Preview 2"
                                    className="w-14"
                                ></img>
                            )}
                        </div>
                        <div className="flex">
                            <Input
                                type="file"
                                accept="image/*"
                                placeholder="Product Name"
                                className="cursor-pointer"
                                onChange={(e) => handleImage(e, "img3")}
                            />
                            {imgPreview.img3 && (
                                <img
                                    src={imgPreview.img3}
                                    alt="Image Preview 3"
                                    className="w-14"
                                ></img>
                            )}
                        </div>
                    </div>
                    <Input
                        type="number"
                        step="1"
                        placeholder="Base Amount"
                        className="w-1/2"
                        {...register("base_amount", { required: true })}
                    />
                    <div className="flex flex-wrap gap-1 ">
                        <div>
                            <p className="text-sm">Start Date</p>
                            <Input
                                type="date"
                                {...register("start_date", { required: true })}
                            />
                        </div>
                        <div>
                            <p className="text-sm">End Date</p>
                            <Input
                                type="date"
                                {...register("end_date", { required: true })}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-400 flex-1 w-fit inline-flex inline-block w-auto rounded text-xl p-1"
                    >
                        <p>Submit</p>
                    </button>
                </form>
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 px-1 m-2 bg-red-600"
                >
                    X
                </button>
            </div>
        </div>
    );
}

export default AddItem;
