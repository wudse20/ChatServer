import {useState} from "react";

export default function Login({login}) {

    const [username, setUsername] = useState("");
    const [ip, setIp] = useState("");
    const [port, setPort] = useState("");

    function handleUsername(event) {
        setUsername(event.target.value);
    }

    function handleIP(event) {
        setIp(event.target.value);
    }

    function handlePort(event) {
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
                    <input type="text" id="username" value={username} onChange={handleUsername} required/>
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <label htmlFor="ip" style={{marginBottom: "0.25rem"}}>IP</label>
                    <input type="text" id="ip" value={ip} onChange={handleIP} required/>
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <label htmlFor="port" style={{marginBottom: "0.25rem"}}>Port</label>
                    <input type="text" id="port" value={port} onChange={handlePort} required/>
                </div>
                <button type="submit" style={{marginTop: "1rem"}}>Login</button>
            </form>

        </>
    )
}