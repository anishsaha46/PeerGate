'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isUploading: boolean;
}

export default function FileUpload({ onFileUpload, isUploading }: FileUploadProps) {
  // State to track whether the user is currently dragging a file over the dropzone
  const [dragActive, setDragActive] = useState(false);
  
  // Callback function to handle the file drop event
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      // Call the onFileUpload prop function with the first accepted file
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);
  
  // Hook from react-dropzone to handle dropzone events and get props for the dropzone element
  const { getRootProps, getInputProps } = useDropzone({ 
    onDrop,
    multiple: false, // Only accept a single file
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    onDropAccepted: () => setDragActive(false),
    onDropRejected: () => setDragActive(false),
  });

  return (
    <div 
      {...getRootProps()} // Spread the props from useDropzone onto the div
      className={`
        w-full p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all
        ${dragActive 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}
        ${isUploading ? 'opacity-50 pointer-events-none' : ''}
      `}
    >
      <input {...getInputProps()} /> {/* Input element for file selection */}
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="p-3 bg-blue-100 rounded-full">
          <FiUpload className="w-6 h-6 text-blue-500" /> {/* Upload icon */}
        </div>
        <p className="text-lg font-medium">Drag & drop a file here, or click to select</p>
        <p className="text-sm text-gray-500">
          Share any file with your peers securely
        </p>
      </div>
    </div>
  );
}