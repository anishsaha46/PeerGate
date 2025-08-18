package p2p;

import p2p.controller.FileController;

public class Main {
    public static void main(String[] args) {
        try {
            // Get port from environment variable or use 8080 as default
            String portEnv = System.getenv().getOrDefault("PORT", "8080");
            System.out.println("PORT environment variable: " + portEnv);
            int port = Integer.parseInt(portEnv);
            
            System.out.println("Starting server on port: " + port);
            FileController server = new FileController(port);
            server.start();
            
            System.out.println("Server successfully started on port " + port);
            System.out.println("Upload directory: " + System.getProperty("java.io.tmpdir"));
            System.out.println("Working directory: " + System.getProperty("user.dir"));
            
            // The server runs on non-daemon threads, so the main thread can exit
            // while the server continues to run.
            
        } catch (Throwable t) {
            System.err.println("Critical error starting the server: " + t.getMessage());
            t.printStackTrace();
            System.exit(1);
        }
    }
}
