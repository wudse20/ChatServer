package se.skorup.main;

import se.skorup.server.Server;

public class Main
{
    public static void main(String[] args)
    {
        var port = 1234;
        var server = new Server(port);
        server.start();
    }
}