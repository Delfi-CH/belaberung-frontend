import {useEffect, useState} from "react";
import {checkStatus, createRoom} from "../lib.js";

export default function CreateRoomComponent() {
    const [isLoggedIn, setIsLoggedIn] = useState(null)

    const [roomName, setRoomName] = useState("")
    const [maxUsers, setMaxUsers] = useState(10)

    useEffect(() => {
        let mounted = true

        checkStatus().then((status) => {
            if (mounted) setIsLoggedIn(status)
        })

        return () => {
            mounted = false
        }
    }, [])

    if (isLoggedIn === null) return null

    if (isLoggedIn) {
        return(
            <>
                <h1>Create Room</h1>
                <p>Name</p>
                <input type="text" value={roomName} onChange={(e)=>setRoomName(e.target.value)}/>
                <p>Max. Users</p>
                <input type="number" value={maxUsers} onChange={(e)=>setMaxUsers(Number(e.target.value))}/>
                <input type="button" value="create" onClick={()=>createRoom(roomName, maxUsers)}/>
            </>
        )}
}