import {useEffect, useState} from "react";
import {checkStatus, fetchRooms, getUserByName, getUsername, logout} from "../lib.js";
import {Navigate} from "react-router";

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
    }, [isLoggedIn])


    if (isLoggedIn === null) return null

    if (isLoggedIn) {
        return(
            <>
                <h1>Home</h1>
                <p>Hello {userData.username}</p>
                <h2>Rooms</h2>
                {roomData.map((room)=>(
                    <h3>{room.name}</h3>
                ))}
                <input type="button" value="logout" onClick={logoutWrapper}/>
            </>
        )
    } else {
       return (<Navigate to="/login"/>)
    }
}