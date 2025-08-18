'use client';

import { useCallback, useMemo, useState } from 'react';
import { useDropzone, FileRejection, Accept } from 'react-dropzone';
import { FiUpload, FiAlertCircle } from 'react-icons/fi';

interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  isUploading: boolean;
  accept?: Accept;           // react-dropzone accept map
  maxSizeMB?: number;        // max file size in MB
  multiple?: boolean;        // default false
  className?: string;        // optional wrapper classes
}

export default function FileUpload({
  onFileUpload,
  isUploading,
  accept,
  maxSizeMB = 0, // 0 = unlimited
  multiple = true,
  className = ''
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const maxSizeBytes = useMemo(
    () => (maxSizeMB > 0 ? maxSizeMB * 1024 * 1024 : undefined),
    [maxSizeMB]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[], rejections: FileRejection[]) => {
      setErrorMsg(null);

      if (rejections.length) {
        const first = rejections[0];
        const reasons = first.errors.map(e => e.message).join(', ');
        setErrorMsg(reasons);
        setDragActive(false);
        return;
      }

      if (!acceptedFiles.length) return;

      const newFiles = [...files, ...acceptedFiles];
      setFiles(newFiles);
      onFileUpload(newFiles);
      setDragActive(false);
    },
    [onFileUpload, files]
  );

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    multiple,
    accept,
    maxSize: maxSizeBytes,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  const stateBorder =
    isDragReject
      ? 'border-red-400 bg-red-50/60 dark:bg-red-500/10'
      : dragActive || isDragAccept
      ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-500/10'
      : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50 dark:border-zinc-700 dark:hover:bg-zinc-900';

  const disabledCls = isUploading ? 'opacity-60 pointer-events-none' : '';

  const formatSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let i = 0;
    let n = bytes;
    while (n >= 1024 && i < units.length - 1) { n /= 1024; i++; }
    return `${n.toFixed(n < 10 ? 2 : 1)} ${units[i]}`;
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        {...getRootProps({
          role: 'button',
          tabIndex: 0,
          'aria-label': 'File uploader. Press Enter to select files or drag and drop.',
        })}
        className={`
          group relative w-full p-8 border-2 border-dashed rounded-xl text-center cursor-pointer
          transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
          ${stateBorder} ${disabledCls}
        `}
      >
        <input {...getInputProps()} aria-label="Choose a file to upload" />

        {/* Subtle animated halo on hover/drag */}
        <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-blue-500/0" />
        </div>

        <div className="flex flex-col items-center justify-center gap-3">
          <div className={`
            p-3 rounded-full
            ${isDragReject ? 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300' :
              (dragActive || isDragAccept) ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300' :
              'bg-blue-100 text-blue-600 dark:bg-zinc-800 dark:text-blue-300'}
          `}>
            {isUploading ? (
              <svg className="h-6 w-6 animate-spin text-blue-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4A4 4 0 008 12H4z"/>
              </svg>
            ) : (
              <FiUpload className="w-6 h-6" />
            )}
          </div>

          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Drag & drop {multiple ? 'files' : 'a file'} here, or click to select
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Files are shared peer‑to‑peer and never stored on our servers.
            {maxSizeMB ? ` Max size: ${maxSizeMB}MB.` : ''}
          </p>

                    {files.length > 0 && !isUploading && (
            <div className="mt-4 w-full max-w-md">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selected Files:</p>
              <ul className="space-y-2">
                {files.map((file, i) => (
                  <li key={i} className="flex items-center justify-between text-sm bg-gray-50 dark:bg-zinc-800 p-2 rounded-md border border-gray-200 dark:border-zinc-700">
                    <span className="truncate max-w-[250px]">{file.name}</span>
                    <span className="text-gray-500 dark:text-gray-400 whitespace-nowrap">{formatSize(file.size)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isDragReject && (
            <div className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
              <FiAlertCircle className="h-4 w-4" />
              <span>File type or size not allowed.</span>
            </div>
          )}

          {!!errorMsg && (
            <div className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
              <FiAlertCircle className="h-4 w-4" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      </div>

      {/* Helper text row */}
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
        Tip: Press Enter to open the file picker. Supports paste from clipboard on supported browsers.
      </div>
    </div>
  );
}
