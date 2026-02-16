import "../style/global.css"
import {useEffect, useState} from "react";
import {checkStatus, fetchRooms, getUserByName, getUsername, logout} from "../lib.js";
import {Link, Navigate} from "react-router";
import message_icon from "../assets/extern/feathericons/message.svg";
import "../style/home.css"

import {updateColors, AvailableColours, CurrentColours} from "../style/colors.js";

export default function HomeComponent() {

    const [isLoggedIn, setIsLoggedIn] = useState(null)

    const [userData, setUserData] = useState([])
    const [roomData, setRoomData] = useState([])

    const logoutWrapper = () => {
        logout()
        setIsLoggedIn(false)
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
            async function fetchRoomData() {
                const rooms = await fetchRooms()
                setRoomData(rooms)
            }
            fetchRoomData()
        }
        updateColors(CurrentColours
        )
    }, [isLoggedIn])


    if (isLoggedIn === null) return null

    if (isLoggedIn) {
        return(
            <>
                <h1>
                    <Link to="/home">
                        <img src={message_icon} alt="Message Bubble" width={48} className="icon"/>
                    </Link>
                    Home
                </h1>
                <p className="hello">Hello, <span className="username">{userData.username}</span></p>
                <h2>Rooms</h2>
                <div className="rooms">
                {roomData.map((room)=>(
                    <div className="singular_room" key={room.id}>
                        <h3>{room.name}</h3>
                        <span><Link to={"/room/"+room.id}>Go to Room</Link></span>
                    </div>
                ))}
                </div>
                <div className="logout_button_container">
                    <Link to="/create" className="logout_button"><span>Create Room</span></Link>
                    <Link to="/profile" className="logout_button"><span>Your Profile</span></Link>
                    <input type="button" value="Logout" onClick={logoutWrapper} className="logout_button"/>
                </div>
            </>
        )
    } else {
       return (<Navigate to="/login"/>)
    }
}