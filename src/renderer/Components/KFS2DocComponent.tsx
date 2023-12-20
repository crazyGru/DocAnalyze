import { FunctionComponent, useEffect, useState } from 'react';
import { createNotification } from '../Components/notificationHelper';
import { DocumentUploadComponent } from './DocumentUpload';
import { ActiveButton } from './ActiveButton';
import { AskModal } from '../Pages/Modal';
import { FaChevronLeft, FaSpinner, FaFilePdf } from 'react-icons/fa';

interface DocComponentProps {
  title: string;
  children: React.ReactNode;
}
interface DocProps {
  isUploaded: boolean;
  docID: string;
}
export const KFS2DocComponent: FunctionComponent<DocComponentProps> = ({
  title,
  children,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [engDocUploaded, setEngDocUploaded] = useState<DocProps>({
    isUploaded: false,
    docID: '',
  });
  const [chDocUploaded, setChDocUploaded] = useState<DocProps>({
    isUploaded: false,
    docID: '',
  });
  const [resDocID, setResDocID] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultURL, setResultURL] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [yesPressed, setYesPressed] = useState(false);

  const handleUpgradePageStep = (newPage: number) => {
    setCurrentStep(newPage);
  };
  const handleSetEngDocInfo = (newState: boolean, docID: string) => {
    setEngDocUploaded({ isUploaded: newState, docID: docID });
  };
  const handleSetChDocInfo = (newState: boolean, docID: string) => {
    setChDocUploaded({ isUploaded: newState, docID: docID });
  };

  const handleReview = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const url = 'http://baba211ss.hopto.org:22384/project/review-two';
    const data = {
      en_doc_id: engDocUploaded.docID,
      zh_doc_id: chDocUploaded.docID,
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        createNotification('danger', '', 'Review failed');
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result, result.document_id);
      setResDocID(result.document_id);
      const downPdfURL = `http://baba211ss.hopto.org:22384/project/download/pdf/${result.document_id}`;
      fetch(downPdfURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('auth-token')}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            createNotification('danger', '', 'Review failed');
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          createNotification('success', '', 'Review success');
          handleUpgradePageStep(currentStep + 1);
          return response.blob();
        })
        .then((blob) => {
          const pdfUrl = URL.createObjectURL(blob);
          console.log(pdfUrl);
          setResultURL(pdfUrl);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching the PDF:', error);
        });
    } catch (error) {
      console.error('Error reviewing:', error);
    }
  };

  const handleDownload = async (openFile = true) => {
    const downloadURL = `http://baba211ss.hopto.org:22384/project/download/${resDocID}`;
    const response = await fetch(downloadURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('auth-token')}`,
      },
    });
    if (!response.ok) {
      createNotification('danger', '', 'Downloading failed');
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result, result.link);

    try {
      window.electron.ipcRenderer.sendMessage(
        'download-file',
        result.link,
        openFile,
      );
    } catch (error) {
      createNotification('danger', '', 'Downloading Error');
      console.error('Error downloading the file: ', error);
    }
  };
  useEffect(() => {
    const unsubscribe = window.electron.ipcRenderer.on(
      'download-file-success',
      () => {
        if (yesPressed) {
          setCurrentStep(1);
          setModalIsOpen(false);
          createNotification('success', '', 'File saved successfully.');
        }
        setYesPressed(false);
      },
    );
    return unsubscribe;
  }, [yesPressed, setCurrentStep, setModalIsOpen]);

  const handlePrevBtnClick = async () => {
    if (isLoading) return;
    setModalIsOpen(true);
  };
  const handleYes = async () => {
    await handleDownload(false);
    setYesPressed(true);
  };

  const handleNo = () => {
    if (isLoading) return;
    setCurrentStep(1);
    setModalIsOpen(false);
  };

  const handleClose = () => {
    setModalIsOpen(false);
  };
  const stepOne = (
    <>
      <div className="rounded flex justify-between pr-4 text-sm h-5 items-center">
        <div>Upload 1 English document and 1 Chinese document</div>
      </div>
      <div
        className="rounded flex justify-evenly w-full"
        style={{ height: 'calc(100% - 160px)' }}
      >
        <div className="rounded w-1/2 pr-1">
          <DocumentUploadComponent
            isENG={true}
            mode="English"
            isUploaded={engDocUploaded.isUploaded}
            setIsUploaded={handleSetEngDocInfo}
          />
        </div>
        <div className="rounded w-1/2 pl-1">
          <DocumentUploadComponent
            isENG={false}
            mode="Chinese"
            isUploaded={chDocUploaded.isUploaded}
            setIsUploaded={handleSetChDocInfo}
          />
        </div>
      </div>
      <div className="rounded w-full h-24 bg-[#1B1D2A] flex justify-end items-center pr-5 ">
        <ActiveButton
          isEnabled={engDocUploaded.isUploaded && chDocUploaded.isUploaded}
          isLoading={isLoading}
          text="Review"
          onClick={handleReview}
        />
      </div>
    </>
  );
  const stepTwo = (
    <>
      <div className="rounded flex justify-start items-center text-sm h-5">
        <div
          className="rounded cursor-pointer hover:bg-slate-600 active:bg-gray-300 rounded-full p-2 transition duration-300 ease-in-out"
          onClick={handlePrevBtnClick}
        >
          <FaChevronLeft />
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <div>Result</div>
      </div>
      <div
        className="rounded h-full flex space-x-4 justify-between"
        style={{ height: 'calc(100% - 32px)' }}
      >
        {isLoading ? (
          <div className="rounded h-full w-[80%] flex justify-center items-center">
            <FaSpinner className="rounded spin-animation" size={70} />
          </div>
        ) : (
          <object
            className="rounded pdf-previewer custom-scroll"
            data={resultURL}
            type="application/pdf"
            width="80%"
            height="100%"
          >
            <p>
              Your browser does not support PDFs.
              <a href={resultURL}>Download the PDF</a>.
            </p>
          </object>
        )}
        <div className="rounded flex flex-col space-y-4 w-[20%]">
          <div className="rounded text-sm font-normal leading-normal text-stone-400 font-sans">
            You have uploaded the following two documents for review. Please
            check the review results on the left column.
          </div>
          <div className="rounded w-full border border-slate-600 p-2 flex items-center text-stone-400 overflow-hidden justify-start space-x-2 bold flex-nowrap">
            <div>
              <FaFilePdf />
            </div>
            <div className="rounded text-sm ">{engDocUploaded.docID}</div>
          </div>
          <div className="rounded w-full border border-slate-600 p-2 flex items-center text-stone-400 overflow-hidden justify-start space-x-2 bold flex-nowrap">
            <div>
              <FaFilePdf />
            </div>
            <div className="rounded text-sm ">{chDocUploaded.docID}</div>
          </div>
          <ActiveButton
            isEnabled={engDocUploaded.isUploaded && chDocUploaded.isUploaded}
            isLoading={isLoading}
            text="Download as DOCX File"
            onClick={handleDownload}
            isDownload={true}
          />
        </div>
      </div>
    </>
  );

  return (
    <div className={`space-y-3 h-full px-2 ${currentStep === 1 && 'pt-3'}`}>
      {currentStep === 1 && (
        <>
          <div className="rounded text-2xl font-normal flex items-end ml-5">
            {title}
          </div>
          <div className="rounded w-full border-t border-white-500" />
          {children}
        </>
      )}
      <div
        className="rounded w-full h-full bg-[#262732] p-5 text-2xl	space-y-4"
        style={{
          height: currentStep < 2 ? 'calc(100% - 107px)' : 'calc(100%)',
        }}
      >
        {currentStep === 1 && stepOne}
        {currentStep === 2 && stepTwo}
        <AskModal
          isOpen={modalIsOpen}
          onYes={handleYes}
          onNo={handleNo}
          onClose={handleClose}
        />
      </div>
    </div>
  );
};
