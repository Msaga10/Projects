import React, { useState } from "react";
import Logo1 from "../assets/Logo1.png";
import LogedInUser from "./LogedInUser";
import { NavLink } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
        },
        {
            name: "Signup",
            slug: "/Signup",
            active: !authStatus,
        },
    ];
    return (
        <header className="flex h-auto gap-2 p-2 bg-dark-blue sticky top-0 z-10"
        // fixed top-0 left-0 w-full z-10
        >
            <NavLink to="/">
                <img src={Logo1} alt="Logo" className="h-10 rounded-full " />
            </NavLink>

            {!authStatus && (
            <span className="px-2 py-[3px] h-min my-auto bg-gray-500 rounded-full ">
                <NavLink
                    to="/Login"
                    className={({ isActive }) =>
                            `${isActive ? "hidden" : ""}  `
                    }
                >
                    {" "}
                    <p className=""> Login</p>
                </NavLink>
            </span>
            )}

            <div className="flex items-center justify-center gap-5 my-auto ml-auto me-5">
                {authStatus && <LogoutBtn />}
                <LogedInUser className="" />
            </div>
        </header>
    );
}

export default Header;
