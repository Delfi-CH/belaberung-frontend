import {useEffect, useState} from "react";
import {addUserToRoom, checkStatus, getMessages, getRoomByID, getUsername, sendMessage} from "../lib.js";
import {Navigate} from "react-router";

export default function Room({roomId}) {

    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [roomData, setRoomData] = useState(null)
    const [messageData, setMessageData] = useState([])

    const [messageContent, setMessageContent] = useState("")
    const [managedUserName, setManagedUserName] = useState("")

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
        if (isLoggedIn) {
            const interval = setInterval(async () => {
                async function fetchRoom() {
                    const room = await getRoomByID(roomId)
                    setRoomData(room)
                }

                await fetchRoom()

                async function fetchMSG() {
                    const messages = await getMessages(roomId)
                    setMessageData(messages)
                }

                await fetchMSG()
            }, 3000)
            return () => clearInterval(interval)
        }
    }, [isLoggedIn, roomId])

    function sendMessageWrapper(content, id) {
        if (content === "") {
            alert("Message cannot be empty")
        } else {
            sendMessage(content, id)
        }
    }

    if (isLoggedIn === null) return null
    if (!roomData) return null

    if (isLoggedIn) {
        return (
            <>
                <h1>Room {roomData.name}</h1>
                <input type="button" value="Join Room" onClick={() => addUserToRoom(yourUsername, roomId)}/>
                <h2>Users</h2>
                <ul>
                    {roomData.members.map((userRoom) => (
                        <li key={userRoom.user.id}>{userRoom.user.username}@{userRoom.user.domain}, {userRoom.role}</li>
                    ))}
                </ul>
                <h2>Messages</h2>
                <div>
                    {messageData.map((message) => (
                        <div key={message.id}>
                            <DisplayMessage timestamp={message.timestamp} username={message.username} content={message.content}/>
                        </div>
                    ))}
                    <div>
                        <input type="text" value={messageContent} onChange={(e) => setMessageContent(e.target.value)}/>
                        <input type="button" value="Send" onClick={() => sendMessageWrapper(messageContent, roomId)}/>
                    </div>
                </div>
                <h2>Manage</h2>
                <p>Username</p><input type="text" value={managedUserName}
                                      onChange={(e) => setManagedUserName(e.target.value)}/>
                <p></p>
                <input type="button" value="Add User" onClick={() => addUserToRoom(managedUserName, roomId)}/>
            </>
        )
    } else {
        return (<Navigate to="/login"/>)
    }
}

function DisplayMessage({username,timestamp,content}) {
    const yourUsername = getUsername()
    let displayedUsername = username

    if (yourUsername === username) {
        displayedUsername = displayedUsername + " (you)"
    }

    return(
        <>
            <p>{displayedUsername} sent at {new Date(timestamp).toLocaleTimeString()}</p>
            <p>{content}</p>
        </>
    )
}