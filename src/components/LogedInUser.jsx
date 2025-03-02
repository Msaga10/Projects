import React, { useEffect, useState } from "react";
import profile from "../assets/profile.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import authService from "../appwrite/auth";
function LogedInUser() {
    const [userName, setUserName] = useState("");
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        const getUserName = async () => {
            try {
                const user = await authService.getCurrentUser();
                setUserName(user.name);
            } catch (error) {
                console.error(error);
            }
        };

        if (authStatus) {
            getUserName();
        }
    }, [authStatus]);
  return (
        <NavLink
            to={authStatus?"/Dashboard":"/Signup"}
            className="flex items-center justify-center gap-1 px-1 bg-blue-600 rounded-full w-max h-max"
            title="Dashboard"
        >
            <img
                src={profile}
                alt="profile"
                className="h-5 m-1 rounded-full border-[1px] border-white p-[1px]"
            />
            {authStatus ? <p>{userName}</p> : <p className="text-white">Guest</p>}
    </NavLink>
    );
}

export default LogedInUser;
