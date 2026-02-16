import {PulseLoader} from "react-spinners";
import "../style/global.css"
import "../style/waiting.css"
import {CurrentColours, updateColors} from "../style/colors.js";

export default function WaitingComponent() {

    updateColors(CurrentColours)

    return(
        <div className="spinner">
            <PulseLoader size={"5vh"}/>
        </div>
    )
}