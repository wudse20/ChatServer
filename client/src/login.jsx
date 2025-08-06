import {useState} from "react";

export default function Login({login}) {

    const [username, setUsername] = useState("");
    const [ip, setIp] = useState("");
    const [port, setPort] = useState("");

    function handleUsername(event) {
        event.preventDefault();
        setUsername(event.target.value);
    }

    function handleIP(event) {
        event.preventDefault();
        setIp(event.target.value);
    }

    function handlePort(event) {
        event.preventDefault();
        setPort(event.target.value);
    }

    function handleLogin(event) {
        event.preventDefault();
        login(username, ip, port);
    }

    return (
        <>
            <form onSubmit={handleLogin} style={{display: "flex", flexDirection: "column", gap: "1rem", width: "300px"}}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <label htmlFor="username" style={{marginBottom: "0.25rem"}}>Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsername}
                        pattern="[\p{L}0-9_]+"
                        required
                        title="Username can only contain letters from any language, numbers, and underscores"
                    />
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <label htmlFor="ip" style={{marginBottom: "0.25rem"}}>IP</label>
                    <input
                        type="text"
                        id="ip"
                        value={ip}
                        onChange={handleIP}
                        pattern="^(?:\d{1,3}\.){3}\d{1,3}$"
                        required
                        title="Please enter a valid IPv4 address (e.g., 192.168.0.1)"
                    />
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <label htmlFor="port" style={{marginBottom: "0.25rem"}}>Port</label>
                    <input
                        type="number"
                        id="port"
                        value={port}
                        onChange={handlePort}
                        min="0"
                        max="65535"
                        required
                        title="Port must be between 0 and 65535"
                    />
                </div>
                <button type="submit" style={{marginTop: "1rem"}}>Login</button>
            </form>

        </>
    )
}