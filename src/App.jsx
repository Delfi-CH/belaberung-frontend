import Debug from "./debug/Debug.jsx";
import {BrowserRouter, Route, Routes, useParams} from "react-router";
import Home from "./components/Home.jsx";
import Room from "./components/Room.jsx";

function App() {

    function HomePage() {
        return(<Home/>)
    }

    function DebugPage() {
        return(<Debug/>)
    }

    function RoomPage() {
        const { id  } = useParams()
        return(<Room roomId={id}/>)
    }

  return (
    <>
        <BrowserRouter>
            <Routes>
                {/* eslint-disable-next-line react-hooks/static-components */}
                <Route path="/debug" element={<DebugPage />}/>
                {/* eslint-disable-next-line react-hooks/static-components */}
                <Route path="/" element={<HomePage/>}/>
                <Route path="/room/:id" element={<RoomPage/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )

}

export default App
