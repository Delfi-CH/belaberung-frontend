import {useEffect, useState} from "react";
import {addUserToRoom, checkStatus, getMessages, getRoomByID, sendMessage} from "../lib.js";
import {Navigate} from "react-router";

export default function Room({roomId}) {

    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [roomData, setRoomData] = useState(null)
    const [messageData, setMessageData] = useState([])

    const [messageContent, setMessageContent] = useState("")
    const [managedUserName, setManagedUserName] = useState("")

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

    function sendMessageWrapper(content, id){
        if (content==="") {
            alert("Message cannot be empty")
        } else {
            sendMessage(content, id)
        }
    }

    if (isLoggedIn === null) return null
    if (!roomData) return null

    if (isLoggedIn) {
        return(
            <>
                <h1>Room {roomData.name}</h1>
                <h2>Users</h2>
                <ul>
                {roomData.members.map((userRoom)=>(
                    <li key={userRoom.user.id}>{userRoom.user.username}@{userRoom.user.domain}, {userRoom.role}</li>
                ))}
                </ul>
                <h2>Messages</h2>
                <div>
                {messageData.map((message)=>(
                    <div key={message.id}>
                        <p>{message.username} sent at {new Date(message.timestamp).toLocaleTimeString()}</p>
                        <p>{message.content}</p>
                    </div>
                ))}
                <div>
                    <input type="text" value={messageContent} onChange={(e)=>setMessageContent(e.target.value)}/>
                    <input type="button" value="Send" onClick={()=>sendMessageWrapper(messageContent, roomId)}/>
                </div>
                </div>
                <h2>Manage</h2>
                <p>Username</p><input type="text" value={managedUserName} onChange={(e)=>setManagedUserName(e.target.value)}/>
                <p></p>
                <input type="button" value="Add User" onClick={()=>addUserToRoom(managedUserName,roomId)}/>
            </>
        )
    } else {
        return (<Navigate to="/login"/>)
    }
}