import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import { checkStatus } from "../lib.js";
import "../style/global.css"


export default function RedirectionComponent() {
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

    return isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
}
