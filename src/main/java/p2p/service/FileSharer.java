package p2p.service;

import java.util.HashMap;
import java.util.Map;

public class FileSharer {

    private final Map<String, String> sharedFiles = new HashMap<>();

    public void addSharedFile(String fileId, String filePath) {
        sharedFiles.put(fileId, filePath);
    }

    public String getFilePath(String fileId) {
        return sharedFiles.get(fileId);
    }
}