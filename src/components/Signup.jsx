import logo from "../assets/Logo1.png";
import bg1 from "../assets/bg-1.jpg";
import { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import {
    faCheck,
    faTimes,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import db_service from "../appwrite/dbConfig";

const USER_REGEX = /[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PSWD_REGEX = /^(?=.*[a-z])(?=.*[A-z])(?=.*[0-9])(?=.*[!@$#]).{8,24}$/;

const Signup = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    // const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    // const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     // if button enabled with js hack
    //     const v1 = USER_REGEX.test(user);
    //     const v2 = PSWD_REGEX.test(pwd);
    //     if (!v1 || !v2) {
    //         setErrMsg("Invalid entry!!");
    //         return;
    //     }
    //     console.log(user, pwd);
    //     setSuccess(true);
    // };

    // const [errMsg, setErrMsg] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const pwd = watch("password");
    const matchPwd = watch("confirmPwd");


    const create = async (data) => {
        setErrMsg("");
        try {
            const userData = await authService.createAccount(data);
            console.log(userData);
            console.log(userData.$id);
            console.log(userData.userId);
            const user_id = userData.userId
            const name = data.name
            const email = userData.providerUid
            const createUserData = await db_service.userDetails(user_id,name,email)
              
            console.log(createUserData);
            
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                navigate("/");
            }
        } catch (error) {
            setErrMsg(error.message);
        }
    };

    useEffect(() => {
        // userRef.current.focus()
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = PSWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd, matchPwd]);
    

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign in</a>
                    </p>
                </section>
            ) : (
                <section>
                    {errMsg && <p ref={errRef}>{errMsg}</p>}
                    <div
                        className="grid h-screen gap-2 bg-center bg-cover "
                        style={{ backgroundImage: `url(${bg1})` }}
                    >
                        <div className="p-4 w-[300px] h-[350px]  border-solid border-1 rounded-lg bg-teal-700/70 border-gray-600 grid h-fit items-center justify-center justify-self-center self-center relative drop-shadow-2xl backdrop-blur-sm">
                            <div className="flex ">
                                <NavLink to="/" className="my-auto">
                                    <img
                                        src={logo}
                                        alt="logo"
                                        className="w-[30px] h-[30px]  rounded-full"
                                    />
                                </NavLink>
                                <h1 className="top-0 p-4 my-0 text-3xl text-white">
                                    <strong>Sign Up</strong>
                                </h1>
                            </div>

                            <form
                                onSubmit={handleSubmit(create)}
                                className="flex flex-col gap-4 "
                            >
                                    <div className="flex flex-col">
                                        {/* User Name */}
                                    <label className="flex gap-2 text-white text-xs">
                                            <strong>User Name</strong>
                                            {validName && (
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faCheck}
                                                    />
                                                </span>
                                            )}

                                            {!(validName || !user) && (
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faTimes}
                                                    />
                                                </span>
                                            )}
                                        </label>
                                    <Input
                                        // label="name"
                                        type="text"
                                        placeholder="Enter Name"
                                        className="p-1 text-white rounded focus:outline-none"
                                        {...register("name", {
                                            required: true,
                                        })}
                                        />
                                        {errors.name && <p className="text-red-600 text-xs">{errors.name.message}</p>}
                                    </div>
                                    {userFocus && user && !validName && (
                                        <p
                                            id="udinote"
                                            className="gap-1 p-1 text-[12px] bg-black rounded"
                                        >
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                            4-24 characters. <br />
                                            Must begin with a letter. <br />
                                        Letters, numbers, underscore, hyphens
                                        allowed.
                                        </p>
                                    )}
                                {/* Email */}
                                <div className="flex flex-col">
                                    <label className="text-xs text-white">
                                        <strong>Email</strong>
                                    </label>
                                    <Input
                                    type="text"
                                    placeholder="Enter Email"
                                    className="p-1 text-black rounded focus:outline-none"
                                    {...register("email",{
                                        required:true
                                    })}
                                    />
                                     {errors.email && <p className="text-red-600 text-xs">{errors.email.message}</p>}
                                </div>
                                    {/* Password */}
                                <div className="flex flex-col">
                                    <label className="text-xs text-white">
                                        <strong>Password</strong>
                                        {pwd && (
                <span>
                  {pwd.length >= 8 && pwd.match(/[a-zA-Z]/) && pwd.match(/\d/) && pwd.match(/[^a-zA-Z0-9]/) ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faTimes} />
                  )}
                </span>
              )}
                                    </label>
                                    <Input
                                    type="password"
                                    placeholder="Enter Password"
                                    className="p-1 text-black rounded focus:outline-none"
                                    {...register("password",{
                                        required:true,
                                        minLength: { value: 8, message: "Password must be at least 8 characters" },
                                        pattern: {
                                          value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/,
                                          message: "Password must contain letters, numbers, and special characters"
                                        }
                                    })}
                                    />
                                     {errors.password && <p className="text-white text-xs">{errors.password.message}</p>}
                                    {pwdFocus && !validPwd && (
                                        <p
                                            id="pwdnote"
                                            className="gap-1 p-1 text-[12px] bg-black rounded"
                                        >
                                            <FontAwesomeIcon
                                                icon={faInfoCircle}
                                            />
                                            8-24 characters <br />
                                            Must have uppercase and lowercase
                                            letter, a number and a special
                                            character <br />
                                            Allowed characters:
                                            <span aria-label="exclamation mark">
                                                !
                                            </span>
                                            <span aria-label="at symbol">
                                                @
                                            </span>
                                            <span aria-label="hashtag">#</span>
                                            <span aria-label="doller sign">
                                                $
                                            </span>
                                        </p>
                                    )}
                                </div>
                                    {/* Confirm Password */}
                                <div className="flex flex-col">
                                    <label className="text-xs text-white">
                                        <strong>Confirm Password</strong>{" "}
                                        {validMatch && matchPwd && (
                                            <span>
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                />
                                            </span>
                                        )}
                                        {!validMatch && matchPwd && (
                                            <span>
                                                <FontAwesomeIcon
                                                    icon={faTimes}
                                                />
                                            </span>
                                        )}
                                    </label>
            <Input
            type="password"
            placeholder="Confirm Password"
            className="p-1 text-black rounded focus:outline-none"
            {...register("confirmPwd",{
                required:true,
                validate: value => value === pwd || "Passwords do not match"
            })}
            />
            {errors.confirmPwd && <p className="text-white text-xs">{errors.confirmPwd.message}</p>}
                                    {matchFocus && !validMatch && (
                                        <p
                                            id="confirmnote"
                                            className="gap-1 p-1 text-[12px] bg-black rounded"
                                        >
                                            <FontAwesomeIcon
                                                icon={faInfoCircle}
                                            />
                                            Must match the first password input
                                            field!
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className={classNames(
                                        "px-2 py-1 text-sm text-white border-solid rounded-lg border-1 ",
                                        { "bg-blue-600": validMatch, "bg-gray-400 text-gray-600": !validMatch }
                                    )}
                                    // disabled={
                                    //     !email || !validPwd || !validMatch
                                    //         ? true
                                    //         : false
                                    // }
                                >
                                    CREATE ACCOUNT
                                </button>
                            </form>
                            <p className="p-1 text-sm text-white">
                                Already Registered?
                                <span className="text-blue-400">
                                    <NavLink to="/Login">Sign In</NavLink>
                                </span>
                            </p>
                        </div>
                    </div>
                </section>
            )}
        </>

    );
};

export default Signup;
