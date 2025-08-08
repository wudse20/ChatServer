import { useState } from "react";

export default function Login({ login, error }) {
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
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                padding: "2rem",
                fontFamily: "Segoe UI, sans-serif"
            }}
        >
            <form
                onSubmit={handleLogin}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    padding: "2rem",
                    boxSizing: "border-box",
                    minWidth: "400px",
                    maxWidth: "400px",
                    width: "100%"
                }}
            >
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="username" style={{ marginBottom: "0.25rem" }}>Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsername}
                        pattern="[\p{L}0-9_]+"
                        required
                        title="Username can only contain letters from any language, numbers, and underscores"
                        style={{
                            padding: "0.5rem",
                            borderRadius: "4px",
                            border: "1px solid #ccc"
                        }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="ip" style={{ marginBottom: "0.25rem" }}>IP</label>
                    <input
                        type="text"
                        id="ip"
                        value={ip}
                        onChange={handleIP}
                        pattern="^(?:\d{1,3}\.){3}\d{1,3}$"
                        required
                        title="Please enter a valid IPv4 address (e.g., 192.168.0.1)"
                        style={{
                            padding: "0.5rem",
                            borderRadius: "4px",
                            border: "1px solid #ccc"
                        }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="port" style={{ marginBottom: "0.25rem" }}>Port</label>
                    <input
                        type="number"
                        id="port"
                        value={port}
                        onChange={handlePort}
                        min="0"
                        max="65535"
                        required
                        title="Port must be between 0 and 65535"
                        style={{
                            padding: "0.5rem",
                            borderRadius: "4px",
                            border: "1px solid #ccc"
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        marginTop: "1rem",
                        padding: "0.75rem",
                        backgroundColor: "#2979ff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Login
                </button>

                {error && (
                    <div
                        style={{
                            marginTop: "1rem",
                            color: "#d32f2f",
                            border: "1px solid #d32f2f",
                            padding: "1rem",
                            borderRadius: "8px",
                            textAlign: "center",
                            width: "100%",
                            boxSizing: "border-box",
                            wordBreak: "break-word"
                        }}
                    >
                        <strong>Error:</strong> {error}
                    </div>
                )}
            </form>
        </div>
    );
}
