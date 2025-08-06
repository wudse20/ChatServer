import { useState } from "react";

export default function Chat({ sendMessage, messages }) {
    const [message, setMessage] = useState('');

    function handleSendMessage(event) {
        event.preventDefault();
        if (message.trim()) {
            sendMessage(message);
            setMessage('');
        }
    }

    function handleMessage(event) {
        setMessage(event.target.value);
    }

    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>
                <textarea
                    value={messages}
                    readOnly
                    style={styles.textarea}
                />
                <form onSubmit={handleSendMessage} style={styles.form}>
                    <label htmlFor="chat-input" style={styles.label}>Message:</label>
                    <input
                        id="chat-input"
                        type="text"
                        value={message}
                        onChange={handleMessage}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Send</button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '2rem',
        overflow: 'hidden',
    },
    container: {
        width: '100%',
        maxWidth: '80rem',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        boxSizing: 'border-box',
    },
    textarea: {
        width: '100%',
        height: 'calc(100vh - 14rem)',
        resize: 'none',
        fontSize: '1rem',
        padding: '1rem',
        marginBottom: '2rem',
        boxSizing: 'border-box',
        overflow: 'hidden',
    },
    form: {
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    label: {
        fontSize: '1rem',
        whiteSpace: 'nowrap',
    },
    input: {
        flexGrow: 1,
        minWidth: '15rem',
        padding: '0.5rem',
        fontSize: '1rem',
    },
    button: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
    }
};
