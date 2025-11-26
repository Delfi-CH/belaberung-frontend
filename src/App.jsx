import Debug from "./debug/Debug.jsx";
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./components/Home.jsx";

function App() {

    function HomePage() {
        return(<Home/>)
    }

    function DebugPage() {
        return(<Debug/>)
    }

  return (
    <>
        <BrowserRouter>
            <Routes>
                {/* eslint-disable-next-line react-hooks/static-components */}
                <Route path="/debug" element={<DebugPage />}/>
                {/* eslint-disable-next-line react-hooks/static-components */}
                <Route path="/" element={<HomePage/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )

}

export default App
