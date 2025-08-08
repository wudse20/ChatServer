import {useState, useRef} from 'react';
import './App.css';
import './login.jsx';
import Login from "./login.jsx";
import Chat from "./Chat.jsx";

function App() {
    const [signedIn, setSignedIn] = useState(false);
    const [messages, setMessages] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const socketRef = useRef(null);

    function login(un, ip, port) {
        socketRef.current = new WebSocket(`ws://${ip}:${port}`);

        socketRef.current.onopen = () => {
            socketRef.current.send(`LOGIN(${un})`);
            console.log("Connected to the server!");
            setSignedIn(true);
            setUsername(un);
            setError("");
        };

        socketRef.current.onerror = (e) => {
            console.error(e);
            setSignedIn(false);
            setError("Connection error: Unable to reach server.");
        };

        socketRef.current.onclose = (event) => {
            if (!signedIn) {
                let reason = "Connection closed unexpectedly.";
                if (event.code === 1006) {
                    reason = "Server unreachable or connection refused.";
                } else if (event.code === 1001) {
                    reason = "Server closed the connection.";
                }
                setError(`WebSocket closed: ${reason}`);
                console.warn("WebSocket closed:", event);
            }
        };

        socketRef.current.onmessage = (e) => {
            const msg = e.data;

            if (msg.startsWith("MESSAGE")) {
                const content = msg.slice("MESSAGE(".length, msg.length - 1);
                const separatorIndex = content.indexOf(',');
                const sender = content.slice(0, separatorIndex).trim();
                const messageText = content.slice(separatorIndex + 1).trim();

                setMessages(prev =>
                    prev !== '' ? `${prev}\n${sender}: ${messageText}` : `${sender}: ${messageText}`
                );
                return;
            }

            if (msg.startsWith("LOGIN")) {
                const content = msg.slice("LOGIN(".length, msg.length - 1);
                setMessages(
                    prev => prev !== '' ? `${prev}\n${content} logged in!` : `${content} logged in!`
                );
                return;
            }

            if (msg.startsWith("DISCONNECT")) {
                const content = msg.slice("DISCONNECT(".length, msg.length - 1);
                setMessages(
                    prev => prev !== '' ? `${prev}\n${content} logged out!` : `${content} logged out!`
                );
            }
        };
    }

    function sendMessage(message) {
        if (signedIn && socketRef.current) {
            socketRef.current.send(`MESSAGE(${username}, ${message})`);
        }
    }

    return (
        <>
            {signedIn
                ? <Chat sendMessage={sendMessage} messages={messages}/>
                : <Login login={login} error={error} s/>
            }
        </>
    );
}

export default App;
