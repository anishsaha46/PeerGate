'use client';

import { useState } from 'react';
import { FiDownload } from 'react-icons/fi';

interface FileDownloadProps {
  onDownload: (port: number) => Promise<void>;
  isDownloading: boolean;
}

export default function FileDownload({ onDownload, isDownloading }: FileDownloadProps) {
  // State to store the invite code (port number) input by the user
  const [inviteCode, setInviteCode] = useState('');
  // State to store any error messages
  const [error, setError] = useState('');
  
  // Event handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setError(''); // Clear any previous error messages
    
    // Parse the input value to an integer
    const port = parseInt(inviteCode.trim(), 10);
    // Validate the port number
    if (isNaN(port) || port <= 0 || port > 65535) {
      setError('Please enter a valid port number (1-65535)');
      return; // Stop further execution if the port is invalid
    }
    
    try {
      // Attempt to download the file using the provided onDownload function
      await onDownload(port);
    } catch (err) {
      // Handle any errors that occur during the download process
      setError('Failed to download the file. Please check the invite code and try again.');
    }
  };
  
  return (
    <div className="space-y-4">
      {/* Display instructions */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h3 className="text-lg font-medium text-blue-800 mb-2">Receive a File</h3>
        <p className="text-sm text-blue-600 mb-0">
          Enter the invite code shared with you to download the file.
        </p>
      </div>
      
      {/* Form for entering the invite code */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-700 mb-1">
            Invite Code
          </label>
          <input
            type="text"
            id="inviteCode"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            placeholder="Enter the invite code (port number)"
            className="input-field"
            disabled={isDownloading} // Disable input while downloading
            required
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>} // Display error message if present
        </div>
        
        <button
          type="submit"
          className="btn-primary flex items-center justify-center w-full"
          disabled={isDownloading} // Disable button while downloading
        >
          {isDownloading ? (
            <span>Downloading...</span> // Show loading message if downloading
          ) : (
            <>
              <FiDownload className="mr-2" /> // Download icon from react-icons/fi
              <span>Download File</span> // Button label
            </>
          )}
        </button>
      </form>
    </div>
  );
}