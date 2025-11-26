import axios from "axios";

export async function refreshUser() {
    let userData;
    await axios.get("http://localhost:8080/api/chat/user").then(response => userData = response.data)
    return userData;
}
export async function refreshRoom() {
    let roomData;
    await axios.get("http://localhost:8080/api/chat/room").then(response => roomData = response.data)
    return roomData;
}

export function createUser(newUserName, newUserPasswd) {
    let returnmsg;
    axios.post("http://localhost:8080/api/chat/user/create", {
        "username": newUserName,
        "password": newUserPasswd,
        "domain": "local"
    }).then(response => {
            returnmsg = "Created User!"
        }
    ).catch(e => {
        if (e.response) {
            if (e.response.status === 409) {
                returnmsg = "Username already in use!"
            } else {
                returnmsg = "Failed to create User"
            }
        }
    })
    return returnmsg
}

export function deleteUser(id) {
    axios.delete("http://localhost:8080/api/chat/user/delete/"+id).catch(e => {
        if (e.response) {
            if (e.response.status === 403) {
                alert("Not allowed to delete User with id " + id)
            }
        }
    })
}
export function createRoom(newRoomName, newRoomMaxUsers) {
    let returnmsg;
    axios.post("http://localhost:8080/api/chat/room/create", {
        "name": newRoomName,
        "users": [],
        "messages": [],
        "max_users" : newRoomMaxUsers
    }).then(response => {
            returnmsg="Created Room!"
        }
    ).catch(e => {
        if (e.response) {
            if (e.response.status === 409) {
                returnmsg="Room Name already in use!"
            } else {
                returnmsg="Failed to create Room"
            }
        }
    })
    return returnmsg
}

export function deleteRoom(id) {
    axios.delete("http://localhost:8080/api/chat/room/delete/"+id)
}