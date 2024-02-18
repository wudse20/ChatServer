package se.skorup.server;

import java.util.ArrayList;
import java.util.List;

public class Connections
{
    private final List<Connection> connections;

    public Connections()
    {
        this.connections = new ArrayList<>();
    }

    public synchronized void add(Connection c)
    {
        if (c != null)
            connections.add(c);
    }

    public synchronized void remove(Connection c)
    {
        connections.remove(c);
    }

    public synchronized int connections()
    {
        return connections.size();
    }
}
