import React, { useState } from "react";
import Input from "./Input";
import { useDispatch } from "react-redux";
import db_service from "../appwrite/dbConfig";
import storage_service from "../appwrite/storageConfig";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { addItem } from "../store/lotSlice";

function AddItem({ isOpen, onClose, addNewItem }) {
    const dispatch = useDispatch();
    const [errMsg, setErrMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state
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
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImgPreview((prev) => ({ ...prev, [key]: imageUrl }));
            setFiles((prev) => ({...prev, [key]:file}))
        }
    };

    const uploadFiles = async() => {
        const uploadedFileUrls = []
        try {
            for(const key in files){
                if(files[key]){
                    const response = await storage_service.uploadFile(files[key])
                    const response1 = response.$id
                    const responseString = JSON.stringify(response1);
                    uploadedFileUrls.push(responseString);
                }
            }
            return uploadedFileUrls;
        } catch (error) {
            console.error("Error uploading files:", error);
            throw error; // Re-throw to be caught by the parent function
        }
    }

    const lotSubmit = async (data) => {
        setErrMsg("");
        setIsSubmitting(true); // Start loading state
        
        try {
            // Parse numeric fields
            if (data.old) {
                data.old = parseInt(data.old, 10);
            }
            if (data.base_amount) {
                data.base_amount = parseInt(data.base_amount, 10);
            }

            const user = await authService.getCurrentUser();
            data.userId = user.$id;
            data.status = "active"

            const uploadedFileUrls = await uploadFiles();
            data.imageUrls = Array.isArray(uploadedFileUrls) ? uploadedFileUrls : [uploadedFileUrls];
            
            const response = await db_service.createLot(data);
            const uniqueId = response.$id;
            
            dispatch(addItem({ ...data, id: uniqueId }));
            
            // Try to add the new item, but don't let errors prevent closing
            try {
                addNewItem({ ...data, id: uniqueId });
            } catch (addItemError) {
                console.error("Error in addNewItem:", addItemError);
            }
            
            // Always close the modal after submission attempt
            return response;
        } catch (error) {
            setErrMsg(error.message || "Error submitting form");
            console.error("Form submission error:", error);
        } finally {
            setIsSubmitting(false); // End loading state
            onClose(); // Make sure modal closes regardless of success/failure
        }
    };
    
    if (!isOpen) {
        return null;
    }
    
    return (
        <div>
            <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"></div>
            <div className="fixed z-50 w-2/3 sm:w-1/2 p-5 my-auto bg-gradient-to-r from-red-400 to-blue-400 text-white rounded-lg shadow-lg left-1/2 transform -translate-x-1/2 h-min text-lg">
                {errMsg && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {errMsg}
                    </div>
                )}
                <form
                    onSubmit={handleSubmit(lotSubmit)}
                    className="flex flex-col gap-2 "
                >
                    <h1 className="text-center">Add Auction Item</h1>
                    <div className="flex gap-1 w-auto">
                        <div className=" w-1/2">
                        <Input
                            type="text"
                            placeholder="Product Name"
                            {...register("item_name", {
                                required: true,
                            })}
                        /></div>
                        <div className=" w-1/2">
                        <Input
                            type="text"
                            placeholder="Product Type"
                            {...register("item_type", {
                                required: true,
                            })}
                        /></div>
                    </div>
                    <select
                        name=""
                        id=""
                        className=" rounded text-black"
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
                        className="p-1 rounded text-black"
                        {...register("description", { required: true })}
                    ></textarea>
                    <div className="sm:flex gap-2">
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
                            step="1"
                            placeholder="Years"
                            className="w-16"
                            {...register("old", { required: true })}
                        />
                       
                    </div>
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
                        className="bg-blue-400 flex-1 w-fit inline-flex inline-block w-auto rounded text-xl p-1 px-1"
                        disabled={isSubmitting}
                    >
                        <p>{isSubmitting ? "Submitting..." : "Submit"}</p>
                    </button>
                </form>
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 px-1 m-2 bg-red-600"
                    disabled={isSubmitting}
                >
                    X
                </button>
            </div>
        </div>
    );
}

export default AddItem;