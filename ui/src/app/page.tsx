'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import FileDownload from '@/components/FileDownload';
import InviteCode from '@/components/InviteCode';
import apiClient from '@/lib/api';

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [fileId, setFileId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'download'>('upload');

      const handleFileSelection = (files: File[]) => {
    setUploadedFiles(files);
  };

  const handleUpload = async () => {
    if (uploadedFiles.length === 0) return;

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      uploadedFiles.forEach(file => {
        formData.append('files', file);
      });
      
      const response = await apiClient.post('/upload', formData);
      console.log('Upload response from server:', response);
      
      setFileId(response.data.fileId);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
    const handleDownload = async (fileId: string) => {
    setIsDownloading(true);
    
    try {
      // Request download from Java backend
      const response = await apiClient.get(`/download/${fileId}`, {
        responseType: 'blob',
      });

      // Log headers to debug file type issue
      console.log('Download response headers:', response.headers);
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Try to get filename from response headers
      const headers = response.headers;
      const contentDisposition = headers['content-disposition'] || '';
      let filename = 'downloaded-file'; // Default filename
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (filenameMatch && filenameMatch.length > 1) {
          filename = filenameMatch[1];
        }
      }
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url); // Clean up the object URL
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file. Please check the invite code and try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">PeerGate</h1>
        <p className="text-xl text-gray-600">Secure P2P File Sharing</p>
      </header>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'upload'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('upload')}
          >
            Share a File
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'download'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('download')}
          >
            Receive a File
          </button>
        </div>
        
        {activeTab === 'upload' ? (
          <div>
            {/* <FileUpload onFileUpload={handleFileUpload} isUploading={isUploading} />
             */}

<FileUpload
  onFileUpload={handleFileSelection}
isUploading={isUploading}
accept={{ 'image/*': ['.png', '.jpg', '.jpeg'], 'application/pdf': ['.pdf'], 'application/zip': ['.zip'] }}
maxSizeMB={100}
/>

            
            {uploadedFiles.length > 0 && !isUploading && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleUpload}
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  disabled={isUploading}
                >
                  Upload {uploadedFiles.length} {uploadedFiles.length === 1 ? 'File' : 'Files'}
                </button>
              </div>
            )}
            
            {isUploading && (
              <div className="mt-6 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                <p className="mt-2 text-gray-600">Uploading file...</p>
              </div>
            )}
            
            {fileId && <InviteCode fileId={fileId} />}

            {fileId && !isUploading && (
              <div className="mt-6 text-center text-green-600">
                <p>File uploaded successfully! Share the code above.</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <FileDownload onDownload={handleDownload} isDownloading={isDownloading} />
            
            {isDownloading && (
              <div className="mt-6 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                <p className="mt-2 text-gray-600">Downloading file...</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>PeerGate &copy; {new Date().getFullYear()} - Secure P2P File Sharing</p>
      </footer>
    </div>
  );
}