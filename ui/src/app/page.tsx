'use client'  

import { useState } from 'react';
import FileUpload from './components/FileUpload';
import FileDownload from './components/FileDownload';
import InviteCode from './components/InviteCode';
import axios from 'axios';

export default function Home(){
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [port , setPort] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'download'>('upload');


  // Function to handle file upload

  const handleFileUpload = async (file:File) => {
    setUploadFile(file);
    setIsUploading(true);

    try{
      const formData= new FormData();
      formData.append('file', file);

      const response = await axios.post('/api/upload',formData, {
        headers:{
          'Content-Type': 'multipart/form-data',
        },
      });

      setPort(response.data.port);
    } catch (error) {
      console.error('File upload failed:', error);
      alert('Failed to upload file. Please try again.');
    } finally{
      setIsUploading(false);
    }
  };






}