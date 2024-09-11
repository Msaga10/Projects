import React, { useState } from "react";
import Logo1 from "../assets/Logo1.png";
import LogedInUser from "./LogedInUser";
import Logout from "../assets/logout.png";
import { NavLink } from "react-router-dom";

function Header() {
    // const [loggedin,setLoggedin] = useState(true)
    // const update = ()=>{
    //   setLoggedin()
    // }
    return (
        <div className="flex h-auto gap-2 p-2 bg-dark-blue">
            <NavLink to="/">
                <img src={Logo1} alt="Logo" className="h-10 rounded-full " />
            </NavLink>
            {/* {loggedin&&( */}
            <span className="px-2 bg-gray-500 rounded-full ">
                <NavLink
                    to="/Signup"
                    className={({ isActive }) =>
                        `${
                            isActive ? "hidden" : ""
                        }  `
                    }
                >
                    {" "}
                    <p className=""> Sign Up</p>
                </NavLink>
            </span>
            {/* )} */}
            <div className="flex items-center justify-center gap-5 my-auto ml-auto me-5">
                <LogedInUser className="" />
                <img src={Logout} alt="logout" className="h-5 cursor-pointer" />
            </div>
        </div>
    );
}

export default Header;
