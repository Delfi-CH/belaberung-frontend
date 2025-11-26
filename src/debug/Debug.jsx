import {useEffect, useState} from "react";
import {createRoom, createUser, deleteRoom, deleteUser, refreshRoom, refreshUser} from "../lib.js";

export default function Debug() {

    const [userData, setUserData] = useState([])
    const [roomData, setRoomData] = useState([])

    const [newUserName, setNewUserName] = useState("")
    const [newUserPasswd, setNewUserPasswd] = useState("")
    const [userCreateResponse, setUserCreateResponse] = useState("")

    const [newRoomName, setNewRoomName] = useState("")
    const [newRoomMaxUsers, setNewRoomMaxUsers] = useState()
    const [newRoomPublic, setNewRoomPublic] = useState()
    const [roomCreateResponse, setRoomCreateResponse] = useState("")

    const fetchData = async () => {
        const users = await refreshUser()
        const rooms = await refreshRoom()
        return { users, rooms }
    };

    useEffect(() => {
        fetchData().then(({ users, rooms }) => {
            setUserData(users)
            setRoomData(rooms)
        })
    }, [])



    const handleCreateNewUserSubmit = async (e) => {
        e.preventDefault()
        setUserCreateResponse(createUser(newUserName, newUserPasswd))
        fetchData().then(({ users, rooms }) => {
            setUserData(users)
            setRoomData(rooms)
        })
    }
    const handleCreateNewRoomSubmit = async (e) => {
        e.preventDefault()
        setRoomCreateResponse(createRoom(newRoomName, newRoomMaxUsers, newRoomPublic))
        fetchData().then(({ users, rooms }) => {
            setUserData(users)
            setRoomData(rooms)
        })
    }

    const handleDeleteUser = async (id) => {
        deleteUser(id)
        fetchData().then(({ users, rooms }) => {
            setUserData(users)
            setRoomData(rooms)
        })
    }

    const handleDeleteRoom = async (id) => {
        deleteRoom(id)
        fetchData().then(({ users, rooms }) => {
            setUserData(users)
            setRoomData(rooms)
        })
    }

    return (
        <div>
            <h1>Debug</h1>
            <h2>Users</h2>
            {userData.map(user => (
                <div key={user.id}>
                    <p>{user.username}@{user.domain}</p>
                    <p>ID = {user.id}</p>
                    <input type="button" onClick={() => handleDeleteUser(user.id)} value="delete"/>
                </div>
            ))}
            <h2>Create User</h2>
            <form onSubmit={handleCreateNewUserSubmit}>
                <p>Username</p>
                <input type="text" onChange={e => setNewUserName(e.target.value)} value={newUserName} required="true"/>
                <p>Password</p>
                <input type="text" onChange={e => setNewUserPasswd(e.target.value)} value={newUserPasswd} required="true"/>
                <input type="submit"/>
            </form>
            <p>{userCreateResponse}</p>
            <h2>Rooms</h2>
            {roomData.map(room => (
                <div key={room.id}>
                    <p>{room.name}</p>
                    <p>ID = {room.id}</p>
                    <p>Public = {room.is_public? "true" : "false"}</p>
                    <p>Max Users = {room.max_users}</p>
                    <p>Owned by = {room.room_root}</p>
                    <input type="button" onClick={() => handleDeleteRoom(room.id)} value="delete"/>

                </div>
            ))}
            <h2>Create Room</h2>
            <form onSubmit={handleCreateNewRoomSubmit}>
                <p>Name</p>
                <input type="text" onChange={e => setNewRoomName(e.target.value)} value={newRoomName} required="true"/>
                <p>Max Users</p>
                <input type="number" onChange={e => setNewRoomMaxUsers(parseInt(e.target.value))} value={newRoomMaxUsers} />
                <p>Public:</p>
                <input type="checkbox" onChange={e => setNewRoomPublic(Boolean(e.target.value))} value={newRoomPublic}/>
                <input type="submit"/>
            </form>
            <p>{roomCreateResponse}</p>
        </div>
    )
}