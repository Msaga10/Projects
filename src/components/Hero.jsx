import React from "react";
import Card from "./Card";
import FilterItems from "./FilterItems";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Hero() {
    const [filters, setFilters] = useState({
        categories: [],
        years: [],
    });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters); 
    };
    return (
        <main className="flex flex-1 min-h-screen">
            <div className="hidden sm:block sm:w-1/4 "
            // sticky top-0 h-screen overflow-y-auto
            >
                <FilterItems onFilterChange={handleFilterChange}/>
            </div>
            <div className="flex w-full gap-4 p-4 bg-primary-blue">
                <Card filters={filters}/>
            </div>
        </main>
    );
}

export default Hero;
