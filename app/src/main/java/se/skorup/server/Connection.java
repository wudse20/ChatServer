package se.skorup.server;

import org.java_websocket.WebSocket;

import java.util.ArrayDeque;
import java.util.Queue;

public class Connection extends Thread
{
    private final WebSocket socket;
    private String username;
    private final Queue<String> message = new ArrayDeque<>();

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

    public synchronized void addMessage(String msg)
    {
        message.offer(msg);
        notifyAll();
    }

    private synchronized String getMessage() throws InterruptedException
    {
        while (message.isEmpty())
            wait();

        return message.poll();
    }

    @Override
    public void run()
    {
        try
        {
            while (socket.isOpen())
            {
                var msg = getMessage();
                socket.send(msg);
            }
        }
        catch (InterruptedException unexpected)
        {
            throw new RuntimeException(unexpected);
        }
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
