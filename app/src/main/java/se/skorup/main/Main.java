package se.skorup.main;

import se.skorup.server.Server;

public class Main
{
    public static void main(String[] args)
    {
        new Server(1234).run();
    }
}