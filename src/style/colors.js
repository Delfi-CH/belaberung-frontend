export let CurrentColours= {
    primary: "#000000",
    secondary: "#FFFFFF",
    text: "#FFFFFF",
    highlight: "#1E90FFFF"
}

export const AvailableColours = Object.freeze({
    Black: {
        primary: "#000000",
        secondary: "#FFFFFF",
        text: "#FFFFFF",
        highlight: "#1E90FFFF"
    },
    White: {
        primary: "#FFFFFF",
        secondary: "#000000",
        text: "#000000",
        highlight: "#1E90FFFF"
    },
    Red: {
        primary: "#B22222FF",
        secondary: "#B22222FF",
        text: "#FFFFFF",
        highlight: "#FFFF00",
    },
    Green: {
        primary: "#008000",
        secondary: "#32CD32FF",
        text: "#FFFFFF",
        highlight: "#7CFC00FF"
    },
    Blue: {
        primary: "#00008b",
        secondary: "#1E90FFFF",
        text: "#FFFFFF",
        highlight: "#FF4500FF"
    },
    Yellow: {
        primary: "#FFFF00",
        secondary: "#B8860BFF",
        text: "#000000",
        highlight: "#B22222FF"
    },
    Pink: {
        primary: "#FF1493FF",
        secondary: "#EE82EEFF", //According to IntelliJ IDEA this is violet for some reason
        text: "#FFFFFF",
        highlight: "#FFD700FF"
    },
    Violet: {
        primary: "#8B008BFF",
        secondary: "#C71585FF",
        text: "#FFFFFF",
        highlight: "#1E90FFFF"
    },
    Orange: {
        primary: "#FF8C00FF",
        secondary: "#FFA500FF",
        text: "#FFFFFF",
        highlight: "#4169E1FF"
    },
    Turquoise: {
        primary: "#00CED1FF",
        secondary: "#40E0D0FF",
        text: "#000000",
        highlight: "#FF4500FF"
    }
})

export function setCurrentColour(colour) {
    localStorage.setItem("colour", colour);
}

export function getCurrentColour() {
    return localStorage.getItem("colour");
}

// TODO: Colour stuff

function getColors() {
    console.log(Object.keys(AvailableColours))
}

getColors()