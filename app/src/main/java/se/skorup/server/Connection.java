package se.skorup.server;

import org.java_websocket.WebSocket;

public class Connection
{
    private final WebSocket socket;
    private String username;

    public Connection(WebSocket socket)
    {
        this.socket = socket;
    }

    public WebSocket getSocket()
    {
        return socket;
    }

    public String getUsername()
    {
        return username;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    @Override
    public int hashCode()
    {
        return socket.hashCode();
    }

    @Override
    public boolean equals(Object o)
    {
        return o instanceof Connection c &&
                c.socket.equals(socket);
    }

    @Override
    public String toString()
    {
        return username != null ? username : socket.getRemoteSocketAddress().toString();
    }
}
