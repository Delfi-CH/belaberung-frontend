import isUrlHttp from "is-url-http";
import { useState } from "react";
import missingImage from "../assets/missing.jpg";
import "../style/message.css";

export default function LinkDisplayComponent({ url }) {
    const [imageError, setImageError] = useState(false);

    return isImageLink(url) ? (
        <img
            className="content_img"
            src={imageError ? missingImage : url}
            alt="image"
            onError={() => setImageError(true)}
            style={{ maxWidth: "200px", maxHeight: "200px" }}
        />
    ) : (
        <a href={url} className="content">{url}</a>
    );
}

function isImageLink(url) {
    if (!isUrlHttp(url)) {
        return false;
    }
    if (url.includes(".jpg")) {
        return true
    } else if (url.includes(".jpeg")) {
        return true
    } else if (url.includes(".png")) {
        return true
    } else if (url.includes(".gif")) {
        return true
    } else if (url.includes(".svg")) {
        return true
    } else if (url.includes(".webp")) {
        return true
    } else if (url.includes(".avif")) {
        return true
    } else return !!url.includes(".jxl");
}
