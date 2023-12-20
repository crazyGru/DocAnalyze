import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AppContext } from '../App';
import { DocumentUploadComponent } from '../Components/DocumentUpload';
import { DocumentTypeSelector } from '../Components/DocumentTypeSelector';
import { ParagraphComponent } from '../Components/ParagraphAnalyzer';
import { FaFilePdf } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';
import { createNotification } from '../Components/notificationHelper';
import { AskModal } from './Modal';
import { ActiveButton } from '../Components/ActiveButton';

interface ParagraphProps {
  originalID: number;
  text: string;
}

interface DocComponentProps {
  children: React.ReactNode;
}
interface DocProps {
  isUploaded: boolean;
  docID: string;
}
const ProductKeyStatementsComponent: FunctionComponent<DocComponentProps> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [engDocUploaded, setEngDocUploaded] = useState<boolean>(false);
  const [chDocUploaded, setChDocUploaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transDocUploaded, setTransDocUploaded] = useState<DocProps>({
    isUploaded: false,
    docID: '',
  });
  const handleSettransDocInfo = (newState: boolean, docID: string) => {
    setTransDocUploaded({ isUploaded: newState, docID: docID });
  };
  const [paragraphs, setParagraphs] = useState<ParagraphProps[]>([]);
  const [originPara, setOriginPara] = useState<string[]>([]);
  const [resDocID, setResDocID] = useState<string>('');
  const [resultURL, setResultURL] = useState<string>('');
  const [isTrained, setIsTrained] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [yesPressed, setYesPressed] = useState(false);

  const updateParagraphs = (
    newParagraphIndex: number,
    strIndex: number,
    flag: boolean,
  ) => {
    if (flag) {
      let tempParagraphs = [];
      for (let i = 0; i < paragraphs.length; i++) {
        if (i === newParagraphIndex) {
          if (
            paragraphs[i].text.substring(0, strIndex) !== '' &&
            paragraphs[i].text.substring(0, strIndex) !== ' '
          ) {
            tempParagraphs.push({
              originalID: paragraphs[i].originalID,
              text: paragraphs[i].text.substring(0, strIndex),
            });
          }
          if (
            paragraphs[i].text.substring(strIndex) !== '' &&
            paragraphs[i].text.substring(strIndex) !== ' '
          ) {
            tempParagraphs.push({
              originalID: paragraphs[i].originalID,
              text: paragraphs[i].text.substring(strIndex),
            });
          }
          continue;
        }
        tempParagraphs.push(paragraphs[i]);
      }
      setParagraphs(tempParagraphs);
    } else {
      let tempParagraphs = [];
      for (let i = 0; i < paragraphs.length; i++) {
        if (
          i === newParagraphIndex - 1 &&
          paragraphs[i].originalID === paragraphs[i + 1].originalID
        ) {
          tempParagraphs.push({
            originalID: paragraphs[i].originalID,
            text: paragraphs[i].text + paragraphs[i + 1].text,
          });
          i++;
          continue;
        }
        tempParagraphs.push(paragraphs[i]);
      }
      setParagraphs(tempParagraphs);
    }
  };

  const fillParagraphs = async (pTxts: string[]) => {
    setIsLoading(true);
    setOriginPara(pTxts);
    const temp = pTxts.map((para, index) => ({
      originalID: index,
      text: para,
    }));
    setParagraphs(temp);
    if (pTxts.length === 0) {
      await handleGenerateStart();
      setCurrentStep(4);
    }
    setIsLoading(false);
  };

  const handleTrainStart = () => {
  };

  const handleGenerateStart = async () => {
    setIsLoading(true);
    setCurrentStep(4);
    let references = {};
    let index = 0;
    for (let i = 0; i < originPara.length; i++) {
      let temp = [];
      for (; index < paragraphs.length; index++) {
        if (paragraphs[index].originalID === i) {
          temp.push(paragraphs[index].text);
        } else {
          break;
        }
      }
      references[originPara[i]] = temp;
    }

    const url = 'http://baba211ss.hopto.org:22384/project/translate';
    const data = {
      doc_id: transDocUploaded.docID,
      references: references,
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
        createNotification('danger', '', 'Generating failed');
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result, result.document_id);
      setResDocID(result.document_id);
      createNotification('success', '', 'Generating success');
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
            createNotification('danger', '', 'Downloading failed');
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          setIsLoading(false);
          return response.blob();
        })
        .then((blob) => {
          const pdfUrl = URL.createObjectURL(blob);
          console.log(pdfUrl);
          setResultURL(pdfUrl);
        })
        .catch((error) => {
          console.error('Error fetching the PDF:', error);
        });
    } catch (error) {
      console.error('Error reviewing:', error);
    }
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    const url = 'http://baba211ss.hopto.org:22384/project/analyze';
    const data = {
      doc_id: transDocUploaded.docID,
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
        createNotification('danger', '', 'Analyzing failed');
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      createNotification('success', '', 'Analyzing success');
      const result = await response.json();
      console.log(result, result.result);
      await fillParagraphs(result.result);
      if (result.result.length) {
        setCurrentStep(3);
      }
      else{
        setCurrentStep(4);
        await handleGenerateStart();
      }
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  const handleDownload = async (isOpen = true) => {
    const downloadURL = `http://baba211ss.hopto.org:22384/project/download/${resDocID}`;
    const response = await fetch(downloadURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('auth-token')}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result, result.link);

    try {
      window.electron.ipcRenderer.sendMessage(
        'download-file',
        result.link,
        isOpen,
      );
    } catch (error) {
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

  const handlePrevBtnClick = () => {
    if (currentStep == 1) setCurrentStep(1);
    if (currentStep == 2) setCurrentStep(1);
    if (currentStep == 3) setCurrentStep(2);
    if (currentStep == 4) {
      setModalIsOpen(true);
      // setCurrentStep(3);
    }
  };

  const handleYes = async () => {
    await handleDownload(false);
    setYesPressed(true);
  };

  const handleNo = () => {
    console.log('OK clicked');
    setCurrentStep(3);
    setModalIsOpen(false);
  };

  const handleClose = () => {
    console.log('Close clicked');
    setModalIsOpen(false);
    // Additional logic for Close action
  };

  const stepOne = (
    <>
      <div className="rounded flex justify-between pr-4 text-sm items-center">
        <div>Step 1: Upload Reference Translation (Optional)</div>
        <ActiveButton
          isEnabled={true}
          isLoading={isLoading}
          text="Skip"
          onClick={() => {
            setCurrentStep(2);
          }}
        />
      </div>
      <div
        className="rounded flex justify-evenly w-full"
        style={{ height: 'calc(100% - 160px)' }}
      >
        <div className="rounded w-1/2 pr-1">
          <DocumentUploadComponent
            isENG={true}
            mode="English"
            isUploaded={engDocUploaded}
            setIsUploaded={setEngDocUploaded}
          />
        </div>
        <div className="rounded w-1/2 pl-1">
          <DocumentUploadComponent
            isENG={false}
            mode="Chinese"
            isUploaded={chDocUploaded}
            setIsUploaded={setChDocUploaded}
          />
        </div>
      </div>
      <div className="rounded w-full h-24 bg-[#1B1D2A] flex justify-end p-5 items-center space-x-3">
        {isTrained ? (
          <button
            className="rounded bg-[#F33030] w-5/6"
            onClick={() => setCurrentStep(2)}
          >
            You have successfully trained your own model! Press to Continue.
          </button>
        ) : (
          <>
            <ActiveButton
              isEnabled={false}
              isLoading={isLoading}
              text="Train"
              onClick={handleTrainStart}
            />
          </>
        )}
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
        <div>Step 2: Upload Document for Translation</div>
      </div>
      <div className="rounded w-full" style={{ height: 'calc(100% - 160px)' }}>
        <DocumentUploadComponent
          isENG={true}
          mode="English"
          isUploaded={transDocUploaded.isUploaded}
          setIsUploaded={handleSettransDocInfo}
        />
      </div>
      <div className="rounded w-full h-24 bg-[#1B1D2A] flex justify-end p-5 items-center space-x-3">
        <ActiveButton
          isEnabled={transDocUploaded.isUploaded}
          isLoading={isLoading}
          text="Translate"
          onClick={handleAnalyze}
        />
      </div>
    </>
  );

  const stepThree = (
    <>
      <div className="rounded flex justify-start items-center text-sm h-5">
        <div
          className="rounded cursor-pointer hover:bg-slate-600 active:bg-gray-300 rounded-full p-2 transition duration-300 ease-in-out"
          onClick={handlePrevBtnClick}
        >
          <FaChevronLeft />
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <div>
          We noticed some long paragraphs in your document. All paragraphs
          should be less 200 words. Please split them into shorter sentences.
        </div>
      </div>
      <div
        className="rounded w-full bg-white overflow-auto p-5 space-y-3 custom-scroll"
        style={{ height: 'calc(100% - 160px)' }}
      >
        {paragraphs.map((para, index) => (
          <ParagraphComponent
            key={index}
            index={index + 1}
            text={para.text}
            updateParagraphs={updateParagraphs}
          />
        ))}
      </div>
      <div className="rounded w-full h-24 bg-[#1B1D2A] flex justify-end p-5 items-center space-x-3">
        <ActiveButton
          isEnabled={transDocUploaded.isUploaded}
          isLoading={isLoading}
          text="Translate"
          onClick={handleGenerateStart}
        />
      </div>
    </>
  );

  const stepFour = (
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
        className="rounded h-full flex space-x-4 justify-evenly"
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
            You have uploaded the following one document for review. Please
            check the review results on the left column.
          </div>
          <div className="rounded w-full border border-slate-600 p-2 flex items-center text-stone-400 overflow-hidden justify-start space-x-2 bold flex-nowrap">
            <div>
              <FaFilePdf />
            </div>
            <div className="rounded text-sm ">{transDocUploaded.docID}</div>
          </div>
          <ActiveButton
            isEnabled={!isLoading}
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
    <div className={`space-y-3 h-full px-2 ${currentStep <= 2 && 'pt-3'}`}>
      {currentStep === 1 && (
        <>
          <div className="rounded text-2xl font-normal flex items-end pl-4">
            Generate Translation
          </div>
          <div className="rounded w-full border-t border-white-500 my-5" />
        </>
      )}
      {currentStep === 2 && children}
      <div
        className="rounded w-full h-full bg-[#262732] p-5 text-2xl	space-y-4"
        style={{
          height: (() => {
            switch (currentStep) {
              case 0:
              case 1:
                return 'calc(100% - 57px)';
              case 2:
                return 'calc(100% - 50px)';
              default:
                return 'calc(100%)';
            }
          })(),
        }}
      >
        {currentStep === 1 && stepOne}
        {currentStep === 2 && stepTwo}
        {currentStep === 3 && stepThree}
        {currentStep === 4 && stepFour}
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

export default function GeneratePage() {
  const app = useContext(AppContext);
  const appName = 'Generate Translation';

  const isShow = app?.currentPage === appName ? '' : 'hidden';

  const DocumentTypes = ['Product Key Facts Statements'];
  const [docType, setDocType] = useState<string>(DocumentTypes[0]);
  const handleDocTypeChange = (newDocType: string) => {
    setDocType(newDocType);
  };
  return (
    <div className={`${isShow} mt-1 h-full w-full`}>
      {docType === DocumentTypes[0] && (
        <ProductKeyStatementsComponent>
          <DocumentTypeSelector
            options={DocumentTypes}
            changeDocType={handleDocTypeChange}
            idx={0}
          ></DocumentTypeSelector>
        </ProductKeyStatementsComponent>
      )}
    </div>
  );
}
