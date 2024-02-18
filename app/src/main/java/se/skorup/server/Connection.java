package se.skorup.server;

import java.io.BufferedInputStream;
import java.io.DataInputStream;
import java.io.IOException;
import java.net.Socket;

public class Connection
{
    private final Server server;
    private final Socket connection;

    private DataInputStream in;

    public Connection(Server server, Socket connection)
    {
        this.server = server;
        this.connection =  connection;
    }

    public void run()
    {
        new Thread(() -> {
            try
            {
                in = new DataInputStream(new BufferedInputStream(connection.getInputStream()));
                var line = "";

                while (!line.equals(ServerConstants.DISCONNECT))
                {
                    line = in.readUTF();
                    System.out.printf("%s: %s%n", connection, line);
                }
            }
            catch (IOException e)
            {
                System.err.printf("Got message: %s%n", e.getLocalizedMessage());
            }
            finally
            {
                try
                {
                    if (in != null)
                        in.close();
                }
                catch (IOException e)
                {
                    System.err.printf("Got message: %s%n", e.getLocalizedMessage());
                }
            }
        }, connection.toString());
    }

    @Override
    public int hashCode()
    {
        return connection.hashCode();
    }

    @Override
    public boolean equals(Object o)
    {
        return o instanceof Connection c &&
               c.connection.equals(connection);
    }

    @Override
    public String toString()
    {
        return connection.toString();
    }
}
