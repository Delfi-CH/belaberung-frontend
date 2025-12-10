import {useEffect, useState} from "react";
import {checkStatus, register} from "../lib.js";
import {Navigate} from "react-router";

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
        <>
            <h1>Register</h1>
            <span>Username</span>
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <span>Password</span>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <input type="button" value="register" onClick={()=>registerWrapper()}/>
            <h2>Already have an account? <a href="/login">Sign in here</a> </h2>
        </>
    )} else {
        return (<Navigate to="/home"/>)
    }
}