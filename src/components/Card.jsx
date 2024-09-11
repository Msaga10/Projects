import React from "react";
import Image from "../assets/watch.jpg";
import { NavLink } from "react-router-dom";

const Amount = 100;

function Card() {
    return (
        <span>
            <NavLink to="/ItemDetailPage" className="">
                <div className="w-[190px] h-[300px] bg-purple-400  flex flex-col  relative  rounded-xl overflow-hidden ">
                    <img
                        src={Image}
                        alt="Product-image"
                        className="absolute top-0  w-[190px] h-[190px] object-cover rounded "
                    />
                    <div className="mt-[190px] relative flex flex-col items-center w-full h-full p-2">
                        <h2 className="text-center">
                            <strong>Product Name</strong>
                        </h2>
                        <p className="text-center">10 year old</p>
                        <div className="absolute bottom-0 left-0 p-2 text-lg">
                            ${Amount}
                        </div>
                        <div className="absolute bottom-0 right-0 p-2 text-lg">
                            15Hr 5Min Left
                        </div>
                    </div>
                </div>
            </NavLink>
        </span>
    );
}

export default Card;
