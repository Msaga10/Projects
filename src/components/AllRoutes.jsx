import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Signup from "./Signup";
import NotFound from "./NotFound"

function AllRoutes() {
    return (
        <>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/Signup' element={<Signup />} />
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </>
    );
}

export default AllRoutes;
