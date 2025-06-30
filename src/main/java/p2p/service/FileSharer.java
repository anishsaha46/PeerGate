package p2p.service;

import p2p.utils.UploadUtils;
import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.HashMap;

public class FileSharer {
    private HashMap<Integer,String> availableFiles;

    public FileSharer() {
        availableFiles = new HashMap<>();
    }

    public int offerFile(String filePath){
        int port;
        while(true){
            port = UploadUtils.generateCode();
            if(!availableFiles.containsKey(port)){
                availableFiles.put(port, filePath);
                return port;
            }
        }
    }

    public void startFileServer(int port){
        String filePath = availableFiles.get(port);

        if(filePath == null) {
            System.out.println("No file available for port: " + port);
            return;
        }

        try(ServerSocket serverSocket = new ServerSocket()){
                        System.out.println("Serving file '" + new File(filePath).getName() + "' on port " + port);
            Socket clientSocket = serverSocket.accept();
            System.out.println("Client connected: " + clientSocket.getInetAddress());

            new Thread(new FileSenderHandler(clientSocket, filePath)).start();
            
        }catch(){
            IOException e) {
            System.err.println("Error starting file server on port " + port + ": " + e.getMessage());
        }
    }


}
