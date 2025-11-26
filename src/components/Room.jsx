import {useEffect, useState} from "react";
import {
    addUserToRoom,
    banUserFromRoom,
    fetchRoomWithID,
    fetchUserWithID,
    removeUserFromRoom,
    unbanUserFromRoom
} from "../lib.js";

export default function Room({roomId}) {

    const [roomData, setRoomData] = useState()
    const [roomRootUserData, setRoomRootUserData] = useState()
    const [roomAdminUsersData, setRoomAdminUsersData] = useState([])
    const [roomUsersData, setRoomUsersData] = useState([])

    const [modifyerUserId, setModifyerUserId] = useState()
    const [modifyerUserData, setModifyerUserData] = useState()


    useEffect(() => {
        fetchRoomWithID(roomId).then((room)=> {
            setRoomData(room)
        })
    }, [roomId])
    const fetchUserForModeration = () => {
        fetchUserWithID(modifyerUserId).then((user)=> {
            setModifyerUserData(user)
        })
    }

    useEffect(() => {
        if (!roomData) return

        if (roomData.room_root) {
            fetchUserWithID(roomData.room_root).then(setRoomRootUserData)
        }

        if (roomData.room_admins) {
            Promise.all(roomData.room_admins.map(id => fetchUserWithID(id)))
                .then(setRoomAdminUsersData)
        }
        if (roomData.users) {
            Promise.all(roomData.users.map(id => fetchUserWithID(id)))
                .then(setRoomUsersData)
        }
    }, [roomData])

    return (
        <div>
            <div>
            <h1>Room {roomData ? roomData.name : "Loading..."}</h1>
            <h2>Users</h2>
            <p>Owner: {roomRootUserData ? roomRootUserData.username + "@" + roomRootUserData.domain : "Loading..."}</p>
            <p>Admins: {roomAdminUsersData.length > 1 ? roomAdminUsersData.map(user => (user.username + "@" + user.domain + " ")): "None"}</p>
            <p>Users:</p>
            <ul>
                {roomUsersData.map(user => (
                    <li key={user.id}>{user.username}@{user.domain}</li>
                ))}
            </ul>
            </div>
            <div>

            </div>
            <div>
                <h2>Usermod.</h2>
                <p>UserID: </p>
                <input type="number" value={modifyerUserId} onChange={e => setModifyerUserId(parseInt(e.target.value))}/>
                <input type="button" onClick={fetchUserForModeration} value="Fetch"/>
                <p>Username: {modifyerUserData ? modifyerUserData.username : "none"}@{modifyerUserData ? modifyerUserData.domain : "none"}</p>
                <input type="button" onClick={() => addUserToRoom(modifyerUserId,roomId)} value="Add User"/>
                <input type="button" onClick={() => removeUserFromRoom(modifyerUserId,roomId)} value="Remove User"/>
                <input type="button" onClick={() => banUserFromRoom(modifyerUserId,roomId)} value="Ban User"/>
                <input type="button" onClick={() => unbanUserFromRoom(modifyerUserId,roomId)} value="Unban User"/>

            </div>
        </div>
    )

}