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
import { Link, NavLink } from "react-router-dom";

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

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with js hack
        const v1 = USER_REGEX.test(user);
        const v2 = PSWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid entry!!");
            return;
        }
        console.log(user, pwd);
        setSuccess(true);
    };

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
                                <h1 className="top-0 p-4 my-0 text-3xl ">
                                    <strong>Sign Up</strong>
                                </h1>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-4 "
                            >
                                <>
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="userName"
                                            className="flex gap-2 text-xs"
                                        >
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
                                        <input
                                            type="text"
                                            id="userName"
                                            placeholder="Enter Name"
                                            ref={userRef}
                                            onChange={(e) =>
                                                setUser(e.target.value)
                                            }
                                            aria-invalid={
                                                validName ? "false" : "true"
                                            }
                                            aria-describedby="udinote"
                                            onFocus={() => setUserFocus(true)}
                                            onBlur={() => setUserFocus(false)}
                                            className="p-1 text-black rounded focus:outline-none"
                                        />
                                    </div>
                                    {userFocus && user && !validName && (
                                        <p
                                            id="udinote"
                                            className="gap-1 p-1 text-[12px] bg-black rounded"
                                        >
                                            <FontAwesomeIcon
                                                icon={faInfoCircle}
                                            />
                                            4-24 characters. <br />
                                            Must begin with a letter. <br />
                                            Letters, numbers, underscore,
                                            hyphens allowed.
                                        </p>
                                    )}
                                </>

                                <div className="flex flex-col">
                                    <label htmlFor="email" className="text-xs ">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        placeholder="Enter Email"
                                        className="p-1 text-black rounded"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                        aria-invalid={
                                            validEmail ? "true" : "false"
                                        }
                                        aria-describedby="emailnote"
                                        onFocus={() => setEmailFocus(true)}
                                        onBlur={() => setEmailFocus(false)}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label
                                        htmlFor="Password"
                                        className="text-xs "
                                    >
                                        <strong>Password</strong>

                                        {validPwd && (
                                            <span>
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                />
                                            </span>
                                        )}
                                        {!(validPwd || !pwd) && (
                                            <span>
                                                <FontAwesomeIcon
                                                    icon={faTimes}
                                                />
                                            </span>
                                        )}
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                        className="p-1 text-black rounded"
                                        onChange={(e) => setPwd(e.target.value)}
                                        required
                                        aria-invalid={
                                            validPwd ? "true" : "false"
                                        }
                                        aria-describedby="pwdnote"
                                        onFocus={() => setPwdFocus(true)}
                                        onBlur={() => setPwdFocus(false)}
                                    />

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

                                <div className="flex flex-col">
                                    <label
                                        htmlFor="confirm_pwd"
                                        className="text-xs "
                                    >
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
                                    <input
                                        type="password"
                                        id="confirm_pwd"
                                        placeholder="Confirm Password"
                                        className="p-1 text-black rounded"
                                        onChange={(e) =>
                                            setMatchPwd(e.target.value)
                                        }
                                        required
                                        aria-invalid={
                                            validMatch ? "false" : "true"
                                        }
                                        aria-describedby="confirmnote"
                                        onFocus={() => setMatchFocus(true)}
                                        onBlur={() => setMatchFocus(false)}
                                    />
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
                                    className={classNames(
                                        "px-2 py-1 text-sm text-white border-solid rounded-lg border-1 ",
                                        {
                                            "bg-blue-600": !(
                                                !email ||
                                                !validPwd ||
                                                !validMatch
                                            ),
                                            "bg-gray-400 text-gray-600":
                                                !email ||
                                                !validPwd ||
                                                !validMatch,
                                        }
                                    )}
                                    disabled={
                                        !email || !validPwd || !validMatch
                                            ? true
                                            : false
                                    }
                                >
                                    CREATE ACCOUNT
                                </button>
                            </form>
                            <p className="p-1 text-sm">
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
