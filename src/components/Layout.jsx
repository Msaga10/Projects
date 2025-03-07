import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login, logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)
    
    function welcomeMsg() {
        return (
            <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Welcome to Alot!</h1>
      <p className="text-lg text-gray-600 mb-6">
        🎉 <strong>Welcome to Alot</strong>, your go-to place for exciting and dynamic online auctions! 🚀
      </p>
      <div className="space-y-4 text-lg text-gray-700">
        <p>🔑 <strong>Features:</strong></p>
        <ul className="list-disc list-inside">
          <li>Browse and bid on a wide range of categories from antiques to tech gadgets.</li>
          <li>Real-time bidding to keep you on your toes.</li>
          <li>Easy-to-use dashboard for tracking your bids and wins.</li>
          {/* <li>Secure payment processing for peace of mind.</li> */}
        </ul>
      </div>
      <p className="mt-6 text-xl font-semibold text-blue-600">🛒 Get Started Now!</p>
      <p className="text-lg text-gray-600">Browse through our featured auctions, place your bids, and be part of the action!</p>
      <p className="mt-4 text-2xl text-green-500 font-bold">Happy Bidding! 🏆</p>
    </div>
        )
    } 

    useEffect(() => {
        let isMounted = true;
        authService.getCurrentUser()
            .then((userData) => {
                if (userData && isMounted) {
                    dispatch(login({ userData }))
                    toast.dark(welcomeMsg, {
                        position: "top-center",
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        style: {
                            width: 'auto',
                            minWidth: '300px',
                            textAlign: 'center',
                            fontSize: '18px',
                            padding: '20px',
                            backgroundColor: '#333',
                            color: '#fff',
                            borderRadius: '8px',
                        },
                    });
                } else {
                    dispatch(logout())
                    navigate("/")
                }
            })
            .finally(() => {
                if (isMounted) setLoading(false)
            })
            return () => {
                isMounted = false;
            }
    }, [])
    return (
        <>
         <ToastContainer 
                position="top-center"
                style={{
                    top: "50%", // Vertically center the container
                    left: "50%", // Horizontally center the container
                    transform: "translate(-50%, -50%)", // Adjust the container position to center it
                }}
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        {!loading ? (
        <div className="h-full flex flex-col">
            {/* <ToastContainer/> */}
            <Header />
            <Outlet />
            <Footer />
        </div>
    ) : null}
    </>)
}

export default Layout;
