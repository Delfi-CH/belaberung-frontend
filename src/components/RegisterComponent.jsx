import {useEffect, useState} from "react";
import {checkStatus, register} from "../lib.js";
import {Link, Navigate} from "react-router";
import message_icon from "../assets/extern/feathericons/message.svg";
import "../style/auth.css"

export default function RegisterComponent() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)


    const registerWrapper = () => {
        register(username,password).then((result)=>{
            if(result===true) {
                setRedirect(true)
            } else {
                alert("Registration failed")
            }
        })
    }
    const [isLoggedIn, setIsLoggedIn] = useState(null)

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
    if (redirect) {
        return (<Navigate to="/home"/>)
    }

    if (!isLoggedIn) {
    return(
        <div className="auth">
            <h1>
                <Link to="/home">
                    <img src={message_icon} alt="Message Bubble" width={48}/>
                </Link>
                Register
            </h1>
            <form action={()=>registerWrapper()} className="auth_form">
                <span>Username</span>
                <input type="username" value={username} onChange={(e)=>setUsername(e.target.value)} className="auth_form_text"/>
                <span>Password</span>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="auth_form_text"/>
                <input type="submit" value="Register" className="auth_form_button"/>
                <h3>Already have an account? <Link to="/login">Sign in here</Link> </h3>
            </form>

        </div>
    )} else {
        return (<Navigate to="/home"/>)
    }
}