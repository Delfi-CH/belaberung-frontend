import {useEffect, useState} from "react";
import {fetchPublicRooms} from "../lib.js";

export default function Home() {

    const [publicRooms, setPublicRooms] = useState()

    useEffect(() => {
        fetchPublicRooms().then((room)=> {
            setPublicRooms(room)
        })
    }, [])
    return(
        <div>
            <h1>Home</h1>
            <h2>Public Rooms:</h2>
            {publicRooms ? publicRooms.map(room => (
                <div key={room.id}>
                    <h3>{room.name}</h3>
                    <p>Users: {room.users.length}/{room.max_users}</p>
                    <a href={"/room/"+room.id}>Join Room</a>
                </div>
            )) : "Loading..."}
        </div>
    )
}