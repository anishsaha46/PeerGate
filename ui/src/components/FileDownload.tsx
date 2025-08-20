'use client';

import { useState } from 'react';
import { FiDownload } from 'react-icons/fi';

interface FileDownloadProps {
  onDownload: (fileId: string) => Promise<void>;
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
    const fileId = inviteCode.trim();
    if (!fileId) {
      setError('Please enter a valid invite code.');
      return;
    }

    try {
      // Attempt to download the file using the provided onDownload function
      await onDownload(fileId);
    } catch (_) {
      // Handle any errors that occur during the download process
      setError('Failed to download the file. Please check the invite code and try again.');
    }
  };

  const handleDownload = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await handleSubmit(e || new Event('submit') as unknown as React.FormEvent);
  };

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800 mx-auto">
      <div className="px-6 py-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20">
            <FiDownload className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">Download File</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Enter the invite code to download the shared file
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="Paste invite code here"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pr-12 text-gray-900 placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
                aria-label="Invite code"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7h3l-4 4-4-4h3V3h2v4zm0 10h-3l4-4 4 4h-3v4h-2v-4z" />
                </svg>
              </div>
            </div>
            
            {error && (
              <div className="mt-2 flex items-start">
                <svg className="mt-0.5 mr-1.5 h-4 w-4 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className={`w-full rounded-lg px-6 py-3.5 text-center text-base font-medium text-white transition-all duration-200 focus:outline-none focus:ring-4 ${
            isDownloading 
              ? 'cursor-not-allowed bg-gray-400 dark:bg-gray-600' 
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          }`}
        >
          {isDownloading ? (
            <div className="flex items-center justify-center">
              <svg className="mr-2 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Downloading...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <FiDownload className="mr-2 h-5 w-5" />
              <span>Download File</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}