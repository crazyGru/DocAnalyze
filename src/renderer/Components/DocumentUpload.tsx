import React, { FunctionComponent, useRef, useState } from 'react';
import { createNotification } from './notificationHelper';

import { FaFileUpload } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';
import { FaWindowClose } from "react-icons/fa";

interface DocumentUploadComponentProps {
  mode: string;
  isUploaded: boolean;
  setIsUploaded: (newState: boolean, docID: string) => void;
}

export const DocumentUploadComponent: FunctionComponent<
  DocumentUploadComponentProps
> = ({ mode, isUploaded, setIsUploaded }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function uploadFile(file: File): Promise<void> {
    const url = 'http://172.104.33.232:8000/project';
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `${localStorage.getItem('auth-token')}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setIsUploaded(true, result.document_id);
      console.log('File uploaded successfully:', result.document_id);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type;
      const isDocx =
        fileType ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      const filesize = file.size;
      const maxFileSize = 10485760; // Example: 10 MB in bytes

      if (!isDocx) {
        // Handle the case where the file is not a .docx file
        createNotification('danger', '', 'Unavailable file type');
        setIsUploaded(false, '');
        return; // Exit the function if the file is not .docx
      }

      if (filesize > maxFileSize) {
        // Handle the case where the file exceeds the size limit
        createNotification('danger', '', 'File is too large');
        setIsUploaded(false, '');
        return; // Exit the function if the file is too large
      }
      setIsUploaded(true, '');
      setFileName(file.name);
      setIsLoading(true);
      await uploadFile(file);
      createNotification('success', '', 'Uploading success');
      setIsLoading(false);
    } else {
      setIsUploaded(false, '');
    }
  };

  return (
    <div className="w-full h-full border-2 border-dashed border-[#36363C] rounded-md mx-1 bg-[#1B1D2A] flex flex-col justify-center items-center space-y-4 relative">
      {isUploaded && <div className='absolute top-2 right-2 cursor-pointer' onClick={()=>{setIsUploaded(false, '')}}><FaWindowClose/></div>}
      {isUploaded ? (
        <>
          <FaCheckCircle size={70} color="#65CC16" />
          <div className="text-base">{fileName}</div>
        </>
      ) : (
        <>
          <FaFileUpload size={70} color="#525462" />
          <div className="text-base">Drag a {mode} document data</div>
        </>
      )}

      {!isUploaded &&
        (isLoading ? (
          <>
            <FaSpinner className="spin-animation" />
          </>
        ) : (
          <>
            <div className="text-xs text-[#9FA6B2]">Or</div>
            <button
              onClick={handleUploadClick}
              className="bg-[#20212E] border-solid border border-[#393A4C] text-sm"
            >
              Select File
            </button>
            <input
              type="file"
              accept=".docx"
              style={{ display: 'none' }}
              onChange={handleFileSelect}
              ref={fileInputRef}
            />
          </>
        ))}

      <div className="text-xs text-[#9FA6B2]">Supports : DOC, DOCX </div>
    </div>
  );
};
