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
import { messaging, app } from "../firebase";
import { getToken, getMessaging } from "firebase/messaging";
import db_service from "../appwrite/dbConfig";

function Layout() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)
    
    function welcomeMsg() {
        return (
            <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center max-w-xl mx-auto mt-10 m-2">
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
    
    const showWelcomeToast = () => {
        const hasSeenWelcome = localStorage.getItem('hasSeenWelcomeToast');
        
        if (!hasSeenWelcome) {
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
            
            localStorage.setItem('hasSeenWelcomeToast', 'true');
        }
    };

    useEffect(() => {
        let isMounted = true;
        authService.getCurrentUser()
            .then((userData) => {
                if (userData && isMounted) {
                    dispatch(login({ userData }))
                } else {
                    dispatch(logout())
                    navigate("/")
                }
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                    showWelcomeToast();
                }
            })
            return () => {
                isMounted = false;
            }
    }, [])

    useEffect(() => {
        const registerServiceWorker = async () => {
          try {
            if ('serviceWorker' in navigator) {
              const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
                scope: '/'
              });
              console.log('Service worker registered successfully:', registration);
              
              await requestNotificationPermission();
            } else {
              console.log('Service workers not supported in this browser');
            }
          } catch (error) {
            console.error('Service worker registration failed:', error);
          }
        };
      
        const requestNotificationPermission = async () => {
          try {
            if (Notification.permission === 'granted') {
              await getFirebaseToken();
            } else if (Notification.permission !== 'denied') {
              const permission = await Notification.requestPermission();
              if (permission === 'granted') {
                await getFirebaseToken();
              }
            }
          } catch (error) {
            console.error('Error requesting notification permission:', error);
          }
        };
      
        const getFirebaseToken = async () => {
          try {
            if (!messaging) {
              console.log('Firebase messaging not available in this browser');
              return;
            }

            const idofsession = await authService.account
            const sessionId = (await idofsession.getSession('current')).$id
            // console.log(ab)

            const userId = (await authService.getCurrentUser()).$id
            // console.log(userrrid);
            
            const token = await getToken(messaging, { 
              vapidKey: 'BAvXroAp8L2SG-1LID-UuBxe_hjL7ZTMMC8CkR5TSsPCi9Yrg0gy71Z04vw7UUu4TQQ4qnaXf7oLNIQtWWw8vn8' 
            });
            // console.log('FCM Token:', token);

            await db_service.upsertFCMToken(userId,sessionId,token)

          } catch (error) {
            console.error('Error getting FCM token:', error);
          }
        };
      
        if (!loading) {
          registerServiceWorker();
        }
      }, [loading]);
    return (
        <>
            <ToastContainer 
                position="top-center"
                style={{
                    top: "50%", 
                    left: "50%", 
                    transform: "translate(-50%, -50%)", 
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
                <div className="min-h-screen flex flex-col">
                    {/* <ToastContainer/> */}
                    <Header />
                    <Outlet />
                    <Footer />
                </div>
            ) : null}
        </>
    )
}

export default Layout;