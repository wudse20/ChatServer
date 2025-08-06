import {useState} from 'react'
import './App.css'
import './login.jsx'
import Login from "./login.jsx";
import Chat from "./Chat.jsx";

function App() {
    const [signedIn, setSignedIn] = useState(false);
    const [messages, setMessages] = useState("");
    const [username, setUsername] = useState("");
    let socket = null;

    function login(un, ip, port) {
        socket = new WebSocket(`ws://${ip}:${port}`);

        socket.onopen = () => {
            socket.send(`LOGIN(${un})`);
            console.log("Connected to the server!");
            setSignedIn(true);
            setUsername(un);
        }

        socket.onerror = (e) => {
            console.error(e);
            setSignedIn(false);
        }

        socket.onmessage = (e) => {
            const msg = e.data;

            if (msg.indexOf("MESSAGE") === -1) {
                return;
            }

            let un = "";
            let sent = "";
            let i = "MESSAGE".length;
            for (; i < msg.length; i++) {
                if (msg[i] !== ',') {
                    un += msg[i];
                }

                break;
            }

            for (; i < msg.length; i++) {
                if (msg[i] !== ')') {
                    sent += msg[i];
                }

                break;
            }

            setMessages(msg => `${msg}\n${un.trim()}: ${sent.trim()}`);
        }
    }

    function sendMessage(message) {
        if (signedIn) {
            socket.send(`MESSAGE(${username}, ${message})`);
        }
    }

    return (
        <>
            {signedIn ? <Chat sendMessage={sendMessage} messages={messages} /> : (<Login login={login} />)}
        </>
    )
}

export default App
