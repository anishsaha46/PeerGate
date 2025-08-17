package p2p;

import p2p.controller.FileController;

public class Main {
    public static void main(String[] args) {
        try {
            // Default port is 8080, but you can change it here
            int port = 8080;
            if (args.length > 0) {
                port = Integer.parseInt(args[0]);
            }
            
            FileController server = new FileController(port);
            server.start();
            
            System.out.println("Server is running on port " + port);
            System.out.println("Press Ctrl+C to stop the server");
            
            // The server runs on non-daemon threads, so the main thread can exit
            // while the server continues to run.
            
        } catch (Throwable t) {
            System.err.println("Critical error starting the server: " + t.getMessage());
            t.printStackTrace();
            System.exit(1);
        }
    }
}
