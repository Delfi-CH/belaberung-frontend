import {BrowserRouter, Route, Routes, useParams} from "react-router";
import Home from "./components/Home.jsx";
import Room from "./components/Room.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

function App() {

    function HomePage() {
        return(<Home/>)
    }

    function RoomPage() {
        const { id  } = useParams()
        return(<Room roomId={id}/>)
    }

    function LoginPage() {
        return(<Login/>)
    }
    function RegisterPage() {
        return(<Register/>)
    }

  return (
    <>
        <BrowserRouter>
            <Routes>
                {/* eslint-disable-next-line react-hooks/static-components */}
                {/* eslint-disable-next-line react-hooks/static-components */}
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/room/:id" element={<RoomPage/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )

}

export default App
