import "../style/global.css"
import {checkStatus, deleteUser, getUserByName, getUsername, logout, updatePassword} from "../lib.js";
import {useEffect, useState} from "react";
import {Link, Navigate} from "react-router";
import WaitingComponent from "./WaitingComponent.jsx";
import message_icon from "../assets/extern/feathericons/message.svg";
import "../style/profile.css"
import {
    AvailableColours,
    CurrentColours,
    getCurrentColourName,
    setCurrentColour, setCurrentColourName,
    updateColors
} from "../style/colors.js";

export default function ProfileComponent() {
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [userData, setUserData] = useState([])

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const [selectedColor, setSelectedColor] = useState(getCurrentColourName());

    const handleColorChange = (color) => {
        setSelectedColor(color);
        setCurrentColour(AvailableColours[color])
        setCurrentColourName(color)
    }


    useEffect(() => {
        let mounted = true

        checkStatus().then((status) => {
            if (mounted) setIsLoggedIn(status)
        })

        return () => {
            mounted = false
        }
    }, [])

    const logoutWrapper = () => {
        logout()
        setIsLoggedIn(false)
    }

    useEffect(() => {
        if (isLoggedIn) {
            const username = getUsername()
            if (username) {
                async function fetchUser() {
                    const user = await getUserByName(username)
                    setUserData(user)
                }
                fetchUser()
            }
        }
        updateColors(CurrentColours)
    }, [isLoggedIn])

    const deleteWrapper = () => {

        if (userData.username === "root") {
            alert("You cant delete root!")
        } else {
            let confirm1 = false
            let confirm2 = false

            if (confirm("Are you sure that you want to delete your Account?")) {
                confirm1 = true
                if (confirm("ARE YOU TOTALLY SURE THAT YOU WANT TO DELETE YOUR ACCOUNT?")) {
                    confirm2 = true
                }
            }
            if (confirm1 && confirm2) {
                deleteUser(userData.id)
                logoutWrapper()
            }
        }
    }
    const updatePasswdWrapper = () => {
        updatePassword(userData.id, oldPassword,newPassword)
        logoutWrapper()
    }

    if (isLoggedIn === null) return null
    if (!userData) return (<WaitingComponent/>)

    if (isLoggedIn) {
        return (
            <div className="profile">
                <h1><Link to="/home">
                    <img src={message_icon} alt="Message Bubble" width={48} className="icon"/>
                </Link>Your Profile</h1>
                <Link to="/home" className="mininav_item"> &lt;- Go Home</Link>
                <h2>Username: {userData.username}</h2>
                <select value={selectedColor} onChange={(e)=>handleColorChange(e.target.value)} className="button">
                    {Object.keys(AvailableColours).map((color)=>(
                        <option key={color} value={color}>Color: {color}</option>
                    ))}
                </select>
                    <form action={()=>updatePasswdWrapper()}  className="update_password">
                        <p>Change Password</p>
                        <label>Current Password</label>
                        <input type="password" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} className="update_password_text" autoComplete="current-password"/>
                        <label>New Password</label>
                        <input type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className="update_password_text" autoComplete="new-password"/>
                        <input type="submit" value="Update" className="button_form"/>
                    </form>
                <input type="button" value="Logout" onClick={()=>logoutWrapper()} className="button"/>
                <input type="button" value="Delete Account" onClick={()=>deleteWrapper()} className="button"/>
            </div>
        )
    } else {
        return (<Navigate to="/login"/>)
    }
}
