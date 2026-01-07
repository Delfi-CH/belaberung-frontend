import {useEffect, useState} from "react";
import {checkStatus, createRoom} from "../lib.js";
import "../style/create.css"
import message_icon from "../assets/extern/feathericons/message.svg";
import {Link, redirect} from "react-router";

export default function CreateRoomComponent() {
    const [isLoggedIn, setIsLoggedIn] = useState(null)

    const [roomName, setRoomName] = useState("")
    useEffect(() => {
        let mounted = true

        checkStatus().then((status) => {
            if (mounted) setIsLoggedIn(status)
        })

        return () => {
            mounted = false
        }
    }, [])

    const createRoomWrapper = () => {
        createRoom(roomName)
        redirect("/home")
    }

    if (isLoggedIn === null) return null

    if (isLoggedIn) {
        return(
            <div className="create">
                <h1>
                    <Link to="/home">
                        <img src={message_icon} alt="Message Bubble" width={48}/>
                    </Link>
                    Create Room
                </h1>
                <Link to="/home" className="mininav_item"> &lt;- Go Home</Link>
                <form action={()=>createRoomWrapper()} className="create_form">
                    <h3>Name</h3>
                    <input type="text" value={roomName} onChange={(e)=>setRoomName(e.target.value)} className="create_form_text"/>
                    <input type="submit" value="Create" className="create_form_buttom"/>
                </form>
            </div>
        )}
}