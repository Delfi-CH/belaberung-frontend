import {useEffect, useState} from "react";
import axios from "axios";

export default function Debug() {

    const [userData, setUserData] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/api/chat/user").then(response => setUserData(response.data))
    }, [])

    return (
        <div>
            <h1>Debug</h1>
            <h2>Users</h2>
            {userData.map(user => (
                <div key={user.id}>
                    <p>{user.username}</p>
                    <p></p>
                </div>
            ))}
        </div>
    )
}