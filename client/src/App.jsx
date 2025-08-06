import {useState} from 'react'
import './App.css'
import './login.jsx'
import Login from "./login.jsx";

function App() {
    const [signedIn, setSignedIn] = useState(false)
    let socket = null;

    function login(username, ip, port) {
        socket = new WebSocket(`ws://${ip}:${port}`);

        socket.onopen = () => {
            socket.send(`LOGIN(${username})`);
            console.log("Connected to the server!");
            setSignedIn(true);
        }

        socket.onerror = (e) => {
            console.error(e);
            setSignedIn(false);
        }
    }

    return (
        <>
            { signedIn ? <div></div> : (<Login login={login} />) }
        </>
    )
}

export default App
