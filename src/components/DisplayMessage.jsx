import "../style/global.css"
import {getUsername} from "../lib.js";
import {format} from "date-fns";
import "../style/message.css"
import {CurrentColours, updateColors} from "../style/colors.js";

export default function DisplayMessage({username,timestamp,content}) {
    const yourUsername = getUsername()
    let usernameAddon = ""

    if (yourUsername === username) {
        usernameAddon = " (you)"
    }
    updateColors(CurrentColours)

    return(
        <div className="main">
            <div className="user_profile">
                <span className="user">{username}</span>
                <span className="username_addon">{usernameAddon}</span>
                <span className="sent_at"> sent at</span>
                <span className="timestamp_desktop"> {format(new Date(timestamp),"HH:mm 'on' MMM dd")}</span>
                <span className="timestamp_mobile"> {format(new Date(timestamp),"HH:mm")}</span>
            </div>
            <p className="content">{content}</p>
        </div>
    )
}