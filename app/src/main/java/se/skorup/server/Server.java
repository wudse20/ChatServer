package se.skorup.server;

import org.java_websocket.server.WebSocketServer;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;

import java.net.InetSocketAddress;

public class Server extends WebSocketServer
{
    private final Connections connections = new Connections();

    public Server(int port)
    {
        super(new InetSocketAddress(port));
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake)
    {
        var c = new Connection(conn);
        connections.add(c);
        System.out.printf("Client connected: %s, clients connected: %d%n", c, connections.size());
    }

    @Override
    public void onMessage(WebSocket conn, String message)
    {
        var c = connections.getBySocket(conn);

        if (message.startsWith("LOGIN(") && message.endsWith(")"))
        {
            var username = message.substring(6, message.length() - 1);
            c.setUsername(username);
            c.start();
            System.out.printf("User logged in: %s%n", username);
            connections.broadcastMessage(message);
            System.out.printf("Broadcasted message: %s%n", message);
            return;
        }

        if (message.startsWith("MESSAGE(") && message.endsWith(")"))
        {
            connections.broadcastMessage(message);
            System.out.printf("Broadcasted message: %s%n", message);
            return;
        }

        System.out.printf("%s: %s%n", c, message);

        if ("DISCONNECT".equalsIgnoreCase(message))
        {
            conn.close();
        }
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote)
    {
        var c = connections.getBySocket(conn);
        connections.remove(c);
        System.out.printf("Client disconnected: %s, clients connected: %d%n", c, connections.size());
        connections.broadcastMessage("DISCONNECT(%s)".formatted(c.getUsername()));
    }

    @Override
    public void onError(WebSocket conn, Exception ex)
    {
        System.err.printf("Error from %s: %s%n",
                conn != null ? conn.getRemoteSocketAddress() : "Unknown", ex.getMessage());
    }

    @Override
    public void onStart()
    {
        System.out.println("WebSocket server started!");
    }
}