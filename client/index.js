function login() {
    const ip = document.getElementById("ip").value;
    const port = document.getElementById("port").value;
    const username = document.getElementById("username").value;
    console.log(`ip: ${ip}:${port}, username: ${username}`);

    const socket = new WebSocket(`ws://${ip}:${port}`);

    socket.addEventListener('open', (event) => {
        socket.send("LOGIN(anton)");
        console.log('Connected to the server');
    });
}