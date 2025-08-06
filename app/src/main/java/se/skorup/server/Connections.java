package se.skorup.server;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class Connections
{
    private final Set<Connection> connections = Collections.synchronizedSet(new HashSet<>());

    public void add(Connection c)
    {
        if (c != null)
            connections.add(c);
    }

    public void remove(Connection c)
    {
        connections.remove(c);
    }

    public int size()
    {
        return connections.size();
    }

    public Set<Connection> getAll()
    {
        return Set.copyOf(connections);
    }

    public Connection getBySocket(Object socket)
    {
        return connections.stream()
                .filter(c -> c.getSocket().equals(socket))
                .findFirst()
                .orElse(null);
    }

    public void broadcastMessage(String msg)
    {
        for (var connection : connections)
            connection.addMessage(msg);
    }
}
