import React, { useState } from "react";
import img1 from "../assets/watch.jpg";
import img2 from "../assets/watch2.jpg";
import img3 from "../assets/clock.jpg";

function ItemDetailPage() {
    const [image, setImage] = useState(img1);

    const updateImage = (e) => {
        setImage(e);
    };

    return (
        <div className="flex h-screen ">
            <div className="w-2/5 p-2 bg-red-300">
                <img
                    id="mainImg"
                    src={image}
                    alt="main image"
                    className=" h-[400px] p-3 m-auto rounded-xl"
                />
                <div className="flex justify-center gap-2 p-1 m-2 bg-red-200 w-fit rounded-xl">
                    <div onClick={() => updateImage(img1)}>
                        {" "}
                        <img
                            src={img1}
                            alt="watch image"
                            className="h-[50px]"
                        />
                    </div>
                    <div onClick={() => updateImage(img2)}>
                        {" "}
                        <img src={img2} alt="watch img" className="h-[50px]" />
                    </div>
                    <div onClick={() => updateImage(img3)}>
                        {" "}
                        <img src={img3} alt="clock img" className="h-[50px]" />
                    </div>
                </div>
            </div>
            <div className="flex-1 px-10 text-black bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                <h2>
                    <strong>product name</strong>
                </h2>
                <p>discription</p>
                <hr /> <br />
                <h2>
                    <strong>product Details</strong>
                </h2>
                <div className="flex justify-between">
                    <ul>
                        <li>Price</li>
                        <li>Catagory</li>
                        <li>Bill available</li>
                        <li>Box available</li>
                        <li>Accessories Avalable</li>
                        <li>In Warranty</li>
                        <li>Purchased On</li>
                    </ul>
                    <ul>
                        <li>$Price</li>
                        <li>$Catagory</li>
                        <li>$Bill available</li>
                        <li>$Box available</li>
                        <li>$Accessories Avalable</li>
                        <li>$In Warranty</li>
                        <li>$Purchased On</li>
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
                        <strong>Bids</strong>
                    </h2>
                    <button className="px-1 bg-purple-200 rounded-full">
                        New Bid
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ItemDetailPage;
