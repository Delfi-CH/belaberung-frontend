import {PulseLoader} from "react-spinners";
import "../style/waiting.css"

export default function WaitingComponent() {

    return(
        <div className="spinner">
            <PulseLoader size={"5vh"}/>
        </div>
    )
}