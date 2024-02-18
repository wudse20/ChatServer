package se.skorup.server;

import java.io.IOException;
import java.net.ServerSocket;

public class Server
{
    private final int port;
    private final Connections connections;

    private ServerSocket server;

    public Server(int port)
    {
        this.port = port;
        this.connections = new Connections();
    }

    public void removeConnection(Connection c)
    {
        connections.remove(c);
    }

    public void run()
    {
        try
        {
            System.out.println("Server is starting!");
            server = new ServerSocket(port);

            while (true)
            {
                var s = server.accept();
                var c = new Connection(this, s);
                connections.add(c);
                c.run();

                System.out.printf("Client connected: %s, clients connected: %s", s, connections.connections());
            }
        }
        catch (IOException e)
        {
            System.err.printf("Got error: %s%n", e.getLocalizedMessage());
        }
        finally
        {
            if (server != null)
            {
                try
                {
                    server.close();
                }
                catch (IOException e)
                {
                    System.err.printf("Got error: %s%n", e.getLocalizedMessage());
                }
            }
        }
    }
}
