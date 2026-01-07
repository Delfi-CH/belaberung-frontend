import {useEffect} from "react";
import {logout} from "../lib.js";
import {Navigate} from "react-router";

export default function LogoutComponent() {

    useEffect(()=>{
        logout()
    })

    return (
        <Navigate to="/login"/>
    )
}