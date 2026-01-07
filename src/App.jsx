import {BrowserRouter, Route, Routes, useParams} from "react-router";
import RedirectionComponent from "./components/RedirectionComponent.jsx";
import Room from "./components/Room.jsx";
import LoginComponent from "./components/LoginComponent.jsx";
import RegisterComponent from "./components/RegisterComponent.jsx";
import HomeComponent from "./components/HomeComponent.jsx";
import CreateRoomComponent from "./components/CreateRoomComponent.jsx";
import ProfileComponent from "./components/ProfileComponent.jsx";

function App() {

    function Redirection() {
        return(<RedirectionComponent/>)
    }

    function HomePage() {
        return(<HomeComponent/>)
    }

    function RoomPage() {
        const { id  } = useParams()
        return(<Room roomId={id}/>)
    }

    function LoginPage() {
        return(<LoginComponent/>)
    }
    function RegisterPage() {
        return(<RegisterComponent/>)
    }
    function CreateRoomPage() {
        return(<CreateRoomComponent/>)
    }
    function ProfilePage() {
        return(<ProfileComponent/>)
    }

  return (
    <>
        <BrowserRouter>
            <Routes>
                {/* eslint-disable-next-line react-hooks/static-components */}
                {/* eslint-disable-next-line react-hooks/static-components */}
                <Route path="/" element={<Redirection/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/room/:id" element={<RoomPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/create" element={<CreateRoomPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )

}

export default App
