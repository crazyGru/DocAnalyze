import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { createNotification } from './notificationHelper';

import { FaFileUpload } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';

interface DocumentUploadComponentProps {
  isENG: boolean;
  mode: string;
  isUploaded: boolean;
  setIsUploaded: (newState: boolean, docID: string) => void;
}

export const DocumentUploadComponent: FunctionComponent<
  DocumentUploadComponentProps
> = ({ isENG, mode, isUploaded, setIsUploaded }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [docID, setDocID] = useState<string>('');
  const [waitingCheck, setWaitingCheck] = useState<boolean>(false);

  async function uploadFile(file: File): Promise<void> {
    const url = 'http://baba211ss.hopto.org:22384/project';
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
      setDocID(result.document_id);
      console.log('File uploaded successfully:', result.document_id);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  useEffect(() => {
    const unsubscribe = window.electron.ipcRenderer.on(
      'checkLang-result',
      (result) => {
        if(waitingCheck && result.id == String(isENG)){
          console.log(result.id, isENG);
          if(isENG === (result.result==="English")){
            createNotification('success', '', 'Successfully uploaded.')
            setIsUploaded(true, docID);
          }
          else{
            if(isENG){
              createNotification('danger', '', 'You should upload English document here.');
            }
            else{
              createNotification('danger', '', 'You should upload Chinese document here.');
            }
            setIsUploaded(false, '');
          }
        }
        setWaitingCheck(false);
      },
    );
    return unsubscribe;
  }, [waitingCheck, setWaitingCheck]);

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
      setFileName(file.name);
      setIsLoading(true);
      await uploadFile(file);
      window.electron.ipcRenderer.sendMessage('checkLang', String(isENG), file.path);
      setWaitingCheck(true);
      setIsLoading(false);
    } else {
      setIsUploaded(false, '');
    }
  };

  return (
    <div className="rounded rounded text-sm w-full h-full  bg-[#1B1D2A] flex flex-col justify-center items-center space-y-4 relative z-5">
      {isUploaded && (
        <div
          className="rounded absolute top-2 right-2 cursor-pointer"
          onClick={() => {
            setIsUploaded(false, '');
          }}
        >
          <RxCross2 />
        </div>
      )}
      {isUploaded ? (
        <>
          <FaCheckCircle size={70} color="#65CC16" />
          <div className="rounded text-sm">{fileName}</div>
        </>
      ) : (
        <>
          <FaFileUpload size={70} color="#525462" />
          {isENG ? (
            <div>Drag an English document here</div>
          ) : (
            <div>Drag a Chinese document here</div>
          )}
        </>
      )}

      {!isUploaded &&
        (isLoading ? (
          <>
            <FaSpinner className="rounded spin-animation" />
          </>
        ) : (
          <>
            <div className="rounded text-sm text-[#9FA6B2]">Or</div>
            <button
              onClick={handleUploadClick}
              className="rounded bg-[#20212E] border-solid border border-[#393A4C] text-sm rounded-full w-[120px]"
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

      <div className="rounded text-sm text-[#9FA6B2]">
        Supported Files : DOCX{' '}
      </div>
    </div>
  );
};
