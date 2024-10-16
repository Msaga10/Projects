import Logout from "../assets/logout.png";
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { logout } from "../store/authSlice"

function LogoutBtn(){
    const dispatch = useDispatch()
    const logoutHandler = ()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
    return (
        <img onClick={logoutHandler} src={Logout} alt="logout" className="h-5 cursor-pointer" />
    )
}

export default LogoutBtn