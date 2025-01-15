import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login, logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Layout() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        authService.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }))
                } else {
                    dispatch(logout())
                    navigate("/")
                }
            })
            .finally(() => setLoading(false))
    }, [authStatus])
    // const [value, setValue] = useState(0)
    // useEffect(()=>{

    //     setTimeout(()=>{
    //         setValue(value => value + 1)
    //             console.log("hello");

    //         },3000)

    // })

    // let color = "blue"
    // const decVal = () => {
    //     setValue(value - 1)
    // }
    return !loading ? (
        <div className="h-full flex flex-col">
            <Header />
            <Outlet />
            <Footer />
        </div>
    ) : null;
}

export default Layout;
