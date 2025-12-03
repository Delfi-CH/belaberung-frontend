import {useState} from "react";
import axios from "axios";

export default function Register() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const register = () => {
        axios.post("http://localhost:8080/api/chat/auth/register", {
            username: username,
            password: password
        }).then(login()).catch(()=>{
            alert("Registration failed! Username may already be in use.")
        })
    }

    const login = () => {
        axios.post("http://localhost:8080/api/chat/auth/login", {
            username: username,
            password: password
        })
    }

    return(
        <>
            <h1>Register</h1>
            <span>Username</span>
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <span>Password</span>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <input type="button" value="register" onClick={()=>register()}/>
        </>
    )
}