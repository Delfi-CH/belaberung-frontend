import "../style/global.css"
import {useEffect, useState} from "react";
import {addUserToRoom, checkStatus, getMessages, getRoomByID, getUsername, sendMessage, subscribeToMessages} from "../lib.js";
import {Navigate, Link} from "react-router";
import DisplayMessage from "./DisplayMessage.jsx";
import WaitingComponent from "./WaitingComponent.jsx";
import "../style/room.css"
import send_icon from "../assets/send.svg"
import message_icon from "../assets/extern/feathericons/message.svg"
import {updateColors, AvailableColours, CurrentColours} from "../style/colors.js";

export default function Room({roomId}) {

    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [roomData, setRoomData] = useState(null)
    const [messageData, setMessageData] = useState([])

    const [messageContent, setMessageContent] = useState("")

    const yourUsername = getUsername()
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
        if (!isLoggedIn) return;

        let eventSource;
        updateColors(CurrentColours)

        getRoomByID(roomId).then(setRoomData);
        getMessages(roomId).then((data) => {
            if (data) setMessageData(data);
        });
        eventSource = subscribeToMessages(roomId, (newMessage) => {
            setMessageData((prev) => [...prev, newMessage]);
        });

        return () => {
            if (eventSource) eventSource.close();
        };
    }, [isLoggedIn, roomId]);

    useEffect(() => {
        const el = document.querySelector(".messages");
        if (el) el.scrollTop = el.scrollHeight;
    }, [messageData]);

    function sendMessageWrapper(content, id) {
        if (content === "") {
            alert("Message cannot be empty")
        } else {
            sendMessage(content, id)
            setMessageContent("")
        }
    }

    if (isLoggedIn === null) return null
    if (!isLoggedIn) return (<Navigate to="/login"/>)

    if (!roomData) return (
        <WaitingComponent/>
    )

    if (isLoggedIn) {
        return (
            <div>
                <div className="header">
                    <h1>
                        <Link to="/home">
                            <img src={message_icon} alt="Message Bubble" width={48} className="icon"/>
                        </Link>
                        {roomData.name}
                    </h1>
                    <div className="mininav_container">
                        <Link to="/home" className="mininav_item"> &lt;- Go Home</Link>
                        <input type="button" value="Join Room" onClick={() => addUserToRoom(yourUsername, roomId)} className="mininav_item"/>
                    </div>
                </div>
                <div className="room">
                    <h2 className="hide_on_desktop">Users</h2>
                    <ul className="users">
                        {roomData.members.map((userRoom) => (
                            <li key={userRoom.user.id}>{userRoom.user.username}@{userRoom.user.domain}</li>
                        ))}
                    </ul>
                    <div className="message_core">
                        <h2 className="hide_on_desktop">Messages</h2>
                        <div className="messages">
                            {messageData.map((message) => (
                                <div key={message.id}>
                                    <DisplayMessage timestamp={message.timestamp} username={message.username} content={message.content}/>
                                </div>
                            ))}
                        </div>
                        <form action={() => sendMessageWrapper(messageContent, roomId)} className="send_message">
                            <input type="text" value={messageContent} onChange={(e) => setMessageContent(e.target.value)} className="send_message_text"/>
                            <button type="submit" value=" " className="send_message_button"><img src={send_icon} alt="Send" className="send_message_icon"/></button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
