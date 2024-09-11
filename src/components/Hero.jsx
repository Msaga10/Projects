import React from "react";
import Card from "./Card";
import FilterItems from "./FilterItems";
import { NavLink } from "react-router-dom";

function Hero() {
    return (
        <div className="flex flex-1">
            <div className="w-1/4 ">
                <FilterItems />
            </div>
            <div className="flex w-full gap-4 p-4 bg-primary-blue">
                <Card />
                <Card />
            </div>
        </div>
    );
}

export default Hero;
