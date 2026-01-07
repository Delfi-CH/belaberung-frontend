import axios from "axios";


//Config
export let backendURL = "http://10.95.214.20:8080"

export function setBackendURL(newUrl) {
    backendURL = newUrl
}

//JWT
export function saveToken(token, username) {
    localStorage.setItem('jwt', token)
    localStorage.setItem("usr", username)
}

export function getToken() {
    return localStorage.getItem('jwt')
}

export function getUsername() {
    return localStorage.getItem("usr")
}

export function removeToken() {
    localStorage.removeItem('jwt')
    localStorage.removeItem("usr")
}

//LoginComponent, Logout
export async function login(username, password) {
    try {
        const response = await axios.post(backendURL+"/api/chat/auth/login", {
            username: username,
            password: password
        })
        const data = await response.data

        if (data.token) {
            saveToken(data.token, username)
            return true
        } else {
            throw new Error("Login failed: no token")
        }
    } catch (err) {
        console.error("Login failed: "+ err)
        throw err
    }
}

export function logout() {
    removeToken()
}

export async function checkStatus() {
    const token = getToken()
    if (!token) return false
    try {
        await axios.get(backendURL + "/api/chat/meta/status", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return true
    } catch {
        return false
    }
}

export async function register(username, password) {
    try {
        const response = await axios.post(backendURL+"/api/chat/auth/register", {
            username: username,
            password: password
        })

        if (response.status === 200) {
            await login(username, password)
            return true
        } else if (response.status === 409 ){
            throw new Error("Username already in Use!")
        } else {
            throw new Error("Registration failed")
        }
    } catch (err) {
        console.error("Registration failed: "+ err)
        throw err
    }
}

//UserData

export async function getUserByName(username) {
    const token = getToken()
    if (!token) return null
    try {
        const response = await axios.get(backendURL+"/api/chat/user/name/"+username, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch {
        return null
    }
}

export async function getUserById(id) {
    const token = getToken()
    if (!token) return null
    try {
        const response = await axios.get(backendURL+"/api/chat/user/id/"+id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch {
        return null
    }
}
export async function fetchRooms() {
    const token = getToken()
    if (!token) return null
    try {
        const response = await axios.get(backendURL+"/api/chat/rooms", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch {
        return null
    }
}

export async function createRoom(name) {
    const token = getToken()
    if (!token) return null
    try {
        const owner = await getUserByName(getUsername())
        const ownerUID = owner.id
        await axios.post(backendURL+"/api/chat/rooms/create",{
            "name": name,
            "owner_user_id": ownerUID
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return null
    } catch {
        return null
    }
}

export async function getRoomByID(id) {
    const token = getToken()
    if (!token) return null
    try {
        const response = await axios.get(backendURL+"/api/chat/rooms/id/"+id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch {
        return null
    }
}

export async function addUserToRoom(username, roomId) {
    const token = getToken()
    if (!token) return null
    try {
        await axios.post(backendURL+"/api/chat/rooms/"+roomId+"/invite",{username}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch {
        return null
    }
}

export async function sendMessage(content, roomId) {
    const token = getToken()
    if (!token) return null
    try {
        const username = getUsername()
        await axios.post(backendURL+"/api/chat/rooms/"+roomId+"/send",{content, username}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch {
        return null
    }
}

export async function getMessages(id) {
    const token = getToken()
    if (!token) return null
    try {
        const response = await axios.get(backendURL+"/api/chat/rooms/"+id+"/messages", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch {
        return null
    }
}

export async function deleteUser(id) {
    const token = getToken()
    if (!token) return null
    try {
        await axios.delete(backendURL+"/api/chat/user/"+id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }})
    } catch {
        return null
    }
}

export async function updatePassword(id, oldPassword, newPassword){
    const token = getToken()
    if (!token) return null
    try {
        await axios.put(backendURL+"/api/chat/user/"+id+"/password",{
            "old_password": oldPassword,
            "new_password": newPassword
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch {
        return null
    }
}