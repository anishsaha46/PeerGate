package p2p;

import p2p.controller.FileController;

public class Main {
    public static void main(String[] args) {
        try {
            // Get port from environment variable or use 8080 as default
            int port = Integer.parseInt(System.getenv().getOrDefault("PORT", "8080"));
            
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
