import React, { FunctionComponent, useContext, useState } from 'react';
import { AppContext } from '../App';
import { DocumentUploadComponent } from '../Components/DocumentUpload';
import { DocumentTypeSelector } from '../Components/DocumentTypeSelector';
import { ProgressBar } from '../Components/ProgressBar';
import { ParagraphComponent } from '../Components/ParagraphAnalyzer';
import { FaFilePdf } from 'react-icons/fa';

const trainingText =
  'We are training AI model with your custom translation style. It takes a couple of minutes. Please wait...';
const analyzingText =
  'We are analyzing your document. It takes a couple of minutes. Please wait...';

const paragraphTxts = [
  '(ii)	“Common Facilities” mean those facilities and equipment for the common use and benefit of the Lot and the Building and not for the use and benefit of a particular Unit exclusively including but not limited to the underground terminal manholes, an undergr Common Facilities” mean those facilities and equipment for the common use and benefit of the Lot and the Building and not for the use and benefit of a particular Unit exclusively including but not limited to the underground terminal manholes, an underg',
  '(ii)	“Common Facilities” mean those facilities and equipment for the common use and benefit of the Lot and the Building and not for the use and benefit of a particular Unit exclusively including but not limited to the underground terminal manholes, an undergr Common Facilities” mean those facilities and equipment for the common use and benefit of the Lot and the Building and not for the use and benefit of a particular Unit exclusively including but not limited to the underground terminal manholes, an underg underground terminal manholes, an undergr Common Facilities” mean those facilities and equipment for the common use and benefit of the Lot and the Building and not for the use and benefit of a particular Unit exclusively including but not limited to the underground terminal manholes, an underg underground terminal manholes, an undergr Common Facilities” mean those facilities and equipment for the common use and benefit of the Lot. (ii)	“Common Facilities” mean those facilities and equipment for the common use and benefit of the Lot and the Building and not for the use and benefit of a particular Unit exclusively including but not limited to the underground terminal manholes, an undergr Common Facilities” mean those facilities and equipment for the common use and benefit of the Lot and the Building and not for the use and benefit of a particular Unit exclusively including but not limited to the underground terminal manholes, an underg underground terminal manholes, an undergr Common Facilities” mean those facilities and equipment for the common use and benefit of the Lot and the Building and not for the use and benefit of a particular Unit exclusively including but not limited to the underground terminal manholes, an underg underground terminal manholes, an undergr Common Facilities” mean those facilities and equipment for the common use and benefit of the Lot.',
  '(ii)	“Common Facilities” mean those facilities and equipment for the common use and benefit of the Lot and the Building and not for the use and benefit of a particular Unit exclusively including but not limited to the underground terminal manholes, an undergr Common Facilities” mean those facilities and equipment for the common use and benefit of the Lot and the Building and not for the use and benefit of a particular Unit exclusively including but not limited to the underground terminal manholes, an underg',
];

interface ParagraphProps {
  originalID: number;
  text: string;
}

interface DocComponentProps {
  setReviewState: (isReview: boolean) => void;
}
interface DocProps {
  isUploaded: boolean;
  docID: string;
}
const ProductKeyStatementsComponent: FunctionComponent<DocComponentProps> = ({
  setReviewState,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [progress, setProgress] = useState(0);
  const [analyzeProgress, setAnalyzeProgress] = useState(0);
  const [generateProgress, setGenerateProgress] = useState(0);
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

  const updateParagraphs = (newParagraphIndex: number, strIndex: number) => {
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
    console.log(tempParagraphs);
  };

  const fillParagraphs = async () => {
    setOriginPara(paragraphTxts);
    const temp = paragraphTxts.map((para, index) => ({
      originalID: index,
      text: para,
    }));
    setParagraphs(temp);
    console.log(temp);
  };

  const handleTrainStart = () => {
    const interval = setInterval(() => {
      const randomTime = Math.random() * 1000;
      const randomIncrement = Math.floor(Math.random() * 10);
      setProgress((prevProgress) =>
        prevProgress + randomIncrement < 100
          ? prevProgress + randomIncrement
          : 100,
      );
      clearInterval(interval);
      setTimeout(handleTrainStart, randomTime);
    }, 20);
    return () => clearInterval(interval);
  };

  const handleTranslateStart = () => {
    const interval = setInterval(() => {
      const randomTime = Math.random() * 1000;
      const randomIncrement = Math.floor(Math.random() * 10);

      setAnalyzeProgress((prevProgress) =>
        prevProgress + randomIncrement < 100
          ? prevProgress + randomIncrement
          : 100,
      );

      if (analyzeProgress > 100) {
        setCurrentStep(currentStep + 1);
      }

      clearInterval(interval);
      setTimeout(handleTranslateStart, randomTime);
    }, 0);

    // Return a function to clear the interval when the component is unmounted or the function is stopped
    return () => clearInterval(interval);
  };

  const handleGenerateStart = async () => {
    setCurrentStep(currentStep + 1);
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

    const url = 'http://172.104.33.232:8000/project/translate';
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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result, result.document_id);
      setResDocID(result.document_id);
      const downPdfURL = `http://172.104.33.232:8000/project/download/pdf/${result.document_id}`;
      fetch(downPdfURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('auth-token')}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
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

      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error('Error reviewing:', error);
    }
  };

  const handleAnalyze = async () => {
    fillParagraphs();
    setCurrentStep(currentStep + 1);
    return;
    setIsLoading(true);
    const url = 'http://172.104.33.232:8000/project/analyze';
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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result, result.result);
      setParagraphs(result.result);
    } catch {}
  };

  const handleDownload = async () => {
    const downloadURL = `http://172.104.33.232:8000/project/download/${resDocID}`;
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
      // Replace 'fileUrl' with your file link

      // Fetching the file
      const response = await fetch(result.link);
      const blob = await response.blob();

      // Creating a temporary link to trigger the download
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'downloadedFile'; // Set the file name here
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading the file: ', error);
    }
  };

  const stepOne = (
    <>
      <div className="flex justify-between items-center">
        <div>Step 1: Upload Reference Translation (Optional)</div>
        <div
          role="button" // This makes it clear that the div is being used as a button
          className={`flex justify-center items-center border-solid border border-[#252637] text-[14px] py-[0px] h-[32px] w-[80px] rounded-xl cursor-pointer text-[#FFF] font-bold text-base text-center inline-block ${
            progress !== 0 ? 'bg-[#525462]' : 'bg-[#306BF3]'
          }`}
          onClick={() => {
            if (progress === 0) setCurrentStep(currentStep + 1);
          }}
          // Adding a tabindex of 0 makes the div focusable and thus more accessible
          tabIndex={0}
          // You can also add keyboard event handling for better accessibility
          onKeyDown={(e) => {
            if (e.key === 'Enter' && progress === 0)
              setCurrentStep(currentStep + 1);
          }}
        >
          Skip
        </div>
      </div>
      <div
        className="flex justify-evenly w-full"
        style={{ height: 'calc(100% - 160px)' }}
      >
        <div className="w-1/2 p-1">
          <DocumentUploadComponent
            mode="English"
            isUploaded={engDocUploaded}
            setIsUploaded={setEngDocUploaded}
          />
        </div>
        <div className="w-1/2 p-1">
          <DocumentUploadComponent
            mode="Chinese"
            isUploaded={chDocUploaded}
            setIsUploaded={setChDocUploaded}
          />
        </div>
      </div>
      <div className="w-full h-24 bg-[#1B1D2A] rounded flex justify-center p-5 font-bold items-center space-x-3">
        {progress === 100 ? (
          <button
            className="bg-[#F33030] w-5/6"
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            You have successfully trained your own model! Press to Continue.
          </button>
        ) : (
          <>
            <div
              className="w-[90%]"
              style={{ visibility: progress === 0 ? 'hidden' : 'visible' }}
            >
              <ProgressBar value={progress} max={100} overview={trainingText} />
            </div>
            <div
              role="button" // This makes it clear that the div is being used as a button
              className={`flex justify-center items-center rounded-lg w-[160px] bg-[#306BF3] border-solid border border-[#252637] h-[43px] ${
                progress !== 0 || (engDocUploaded && chDocUploaded) === false
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
              onClick={progress === 0 ? handleTrainStart : undefined}
              // Adding a tabindex of 0 makes the div focusable and thus more accessible
              tabIndex={0}
              // You can also add keyboard event handling for better accessibility
              onKeyDown={(e) => {
                if (e.key === 'Enter' && progress === 0) handleTrainStart();
              }}
              // The style or additional class to visually indicate if it's disabled
              style={{ pointerEvents: progress !== 0 ? 'none' : 'auto' }}
            >
              Train
            </div>
          </>
        )}
      </div>
    </>
  );

  const stepTwo = (
    <>
      <div>Step 2: Upload Document for Translation</div>
      <div className="w-full" style={{ height: 'calc(100% - 160px)' }}>
        <DocumentUploadComponent
          mode="English"
          isUploaded={transDocUploaded.isUploaded}
          setIsUploaded={handleSettransDocInfo}
        />
      </div>
      <div className="w-full h-24 bg-[#1B1D2A] rounded flex justify-center p-5 font-bold items-center space-x-3">
        {analyzeProgress === 100 ? (
          <button className="bg-[#F33030] w-5/6" onClick={handleAnalyze}>
            You have successfully analyze your own doc! Press to Continue.
          </button>
        ) : (
          <>
            <div
              className="w-[90%]"
              style={{
                visibility: analyzeProgress === 0 ? 'hidden' : 'visible',
              }}
            >
              <ProgressBar
                value={analyzeProgress}
                max={100}
                overview={analyzingText}
              />
            </div>
            <div
              role="button"
              className={`flex justify-center items-center rounded-lg w-[160px] bg-[#306BF3] border-solid border border-[#252637] h-[43px] ${
                analyzeProgress !== 0 || transDocUploaded.isUploaded === false
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
              onClick={analyzeProgress === 0 ? handleTranslateStart : undefined}
              style={{ pointerEvents: analyzeProgress !== 0 ? 'none' : 'auto' }}
            >
              Translate
            </div>
          </>
        )}
      </div>
    </>
  );

  const stepThree = (
    <>
      <div>
        We noticed some long paragraphs in your document. All paragraphs should
        be less 200 words. Please split them into shorter sentences.
      </div>
      <div
        className="w-full bg-white rounded-md overflow-auto p-5 space-y-3 custom-scroll"
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
      <div className="w-full h-24 bg-[#1B1D2A] rounded flex justify-end p-5 font-bold items-center space-x-3">
        <div
          role="button"
          className={`flex justify-center items-center rounded-lg w-[160px] bg-[#306BF3] border-solid border border-[#252637] h-[43px] cursor-pointer`}
          onClick={handleGenerateStart}
          style={{ pointerEvents: 'auto' }}
        >
          Translate
        </div>
      </div>
    </>
  );

  const stepFour = (
    <div className="h-full flex space-x-4 justify-evenly">
      <object
        className="pdf-previewer custom-scroll"
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
      <div className="flex flex-col space-y-4 w-[20%]">
        <div className="text-sm font-normal leading-normal text-stone-400 font-sans">
          You have uploaded the following two documents for review. Please check
          the review results on the left column.
        </div>
        <div className="w-full border border-slate-600 p-2 flex items-center text-red-700 overflow-hidden justify-start space-x-2 bold">
          <div>
            <FaFilePdf />
          </div>
          <div className="text-sm ">{transDocUploaded.docID}</div>
        </div>
        <div
          className="w-full border border-slate-600 p-2 flex items-center text-white bg-[#3371BC] hover:bg-[#2C63A0] active:bg-[#1E4D80] overflow-hidden justify-center font-bold text-sm cursor-pointer space-x-2"
          onClick={handleDownload}
        >
          Download
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full rounded-2xl bg-[#262732] p-5 text-2xl	space-y-4">
      {currentStep === 1 && stepOne}
      {currentStep === 2 && stepTwo}
      {currentStep === 3 && stepThree}
      {currentStep === 4 && stepFour}
    </div>
  );
};

export default function GeneratePage() {
  const app = useContext(AppContext);
  const appName = 'Generate Translation';

  const isShow = app?.currentPage === appName ? '' : 'hidden';

  const DocumentTypes = ['Product Key Facts Statements'];
  const [docType, setDocType] = useState<string>(DocumentTypes[0]);
  const [docReview, setDocReview] = useState<boolean>(false);
  const handleDocTypeChange = (newDocType: string) => {
    setDocType(newDocType);
  };
  const handleViewStateChange = (isReview: boolean) => {
    setDocReview(isReview);
  };
  return (
    <div className={`${isShow} p-8 pb-2 h-full w-full`}>
      <div className="">
        <svg
          width="332"
          height="20"
          viewBox="0 0 332 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.7617 6.625C20.7617 5.6875 20.6602 4.94531 20.457 4.39844C20.2539 3.85156 19.918 3.4375 19.4492 3.15625C18.9805 2.875 18.3633 2.69531 17.5977 2.61719C16.832 2.53906 15.8867 2.5 14.7617 2.5H8.73828C7.73828 2.5 6.89453 2.53125 6.20703 2.59375C5.52734 2.64844 4.96484 2.76563 4.51953 2.94531C4.07422 3.125 3.73047 3.38281 3.48828 3.71875C3.24609 4.05469 3.07031 4.5 2.96094 5.05469C2.85156 5.60937 2.78906 6.29297 2.77344 7.10547C2.75781 7.91016 2.75 8.875 2.75 10C2.75 11.125 2.75781 12.0938 2.77344 12.9062C2.79688 13.7109 2.86328 14.3906 2.97266 14.9453C3.08203 15.5 3.25391 15.9453 3.48828 16.2812C3.73047 16.6172 4.07422 16.875 4.51953 17.0547C4.96484 17.2344 5.52734 17.3555 6.20703 17.418C6.89453 17.4727 7.73828 17.5 8.73828 17.5H14.7734C15.6484 17.5 16.4023 17.4766 17.0352 17.4297C17.668 17.3828 18.207 17.2969 18.6523 17.1719C19.0977 17.0469 19.457 16.875 19.7305 16.6562C20.0039 16.4375 20.2148 16.1641 20.3633 15.8359C20.5195 15.5 20.625 15.1016 20.6797 14.6406C20.7344 14.1719 20.7617 13.625 20.7617 13V11.875H11.7383V10H23.0117V13C23.0117 13.75 22.9648 14.4297 22.8711 15.0391C22.7773 15.6406 22.6094 16.1797 22.3672 16.6562C22.1328 17.125 21.8164 17.5312 21.418 17.875C21.0195 18.2188 20.5156 18.5039 19.9062 18.7305C19.2969 18.9492 18.5703 19.1094 17.7266 19.2109C16.8828 19.3203 15.8984 19.375 14.7734 19.375H8.73828C7.36328 19.375 6.20312 19.2891 5.25781 19.1172C4.32031 18.9531 3.54688 18.7031 2.9375 18.3672C2.32812 18.0234 1.85547 17.5938 1.51953 17.0781C1.19141 16.5625 0.949219 15.957 0.792969 15.2617C0.644531 14.5664 0.558594 13.7812 0.535156 12.9062C0.511719 12.0312 0.5 11.0625 0.5 10C0.5 8.9375 0.511719 7.96875 0.535156 7.09375C0.558594 6.21875 0.644531 5.43359 0.792969 4.73828C0.949219 4.04297 1.19141 3.4375 1.51953 2.92188C1.85547 2.40625 2.32812 1.98047 2.9375 1.64453C3.54688 1.30078 4.32031 1.04688 5.25781 0.882812C6.20312 0.710937 7.36328 0.625 8.73828 0.625H14.7617C15.8867 0.625 16.8711 0.679688 17.7148 0.789062C18.5586 0.890625 19.2852 1.05078 19.8945 1.26953C20.5039 1.48047 21.0078 1.75 21.4062 2.07812C21.8125 2.40625 22.1328 2.79297 22.3672 3.23828C22.6094 3.68359 22.7773 4.1875 22.8711 4.75C22.9648 5.3125 23.0117 5.9375 23.0117 6.625H20.7617ZM33.8984 19.2578C32.3984 19.2578 31.125 19.1562 30.0781 18.9531C29.0312 18.7422 28.1797 18.3828 27.5234 17.875C26.8672 17.3672 26.3906 16.6875 26.0938 15.8359C25.7969 14.9844 25.6484 13.9141 25.6484 12.625C25.6484 11.1484 25.7969 9.92969 26.0938 8.96875C26.3906 8 26.8672 7.23047 27.5234 6.66016C28.1797 6.08984 29.0312 5.69141 30.0781 5.46484C31.125 5.23828 32.3984 5.125 33.8984 5.125C34.9688 5.125 35.8945 5.20313 36.6758 5.35938C37.4648 5.51562 38.1367 5.74219 38.6914 6.03906C39.2539 6.33594 39.707 6.69531 40.0508 7.11719C40.4023 7.53906 40.6758 7.98438 40.8711 8.45312C41.0742 8.91406 41.2109 9.45703 41.2812 10.082C41.3594 10.707 41.3984 11.3672 41.3984 12.0625L41.2109 12.8125H27.8984C27.8984 13.8438 28 14.6914 28.2031 15.3555C28.4062 16.0117 28.7422 16.4922 29.2109 16.7969C29.6797 17.1016 30.2969 17.2969 31.0625 17.3828C31.8281 17.4609 32.7734 17.5 33.8984 17.5C34.9297 17.5 35.7812 17.4727 36.4531 17.418C37.1328 17.3555 37.6719 17.2422 38.0703 17.0781C38.4688 16.9141 38.7461 16.6875 38.9023 16.3984C39.0664 16.1016 39.1484 15.7188 39.1484 15.25H41.3984C41.3984 15.9766 41.2695 16.5977 41.0117 17.1133C40.7617 17.6211 40.3438 18.0352 39.7578 18.3555C39.1719 18.668 38.3984 18.8945 37.4375 19.0352C36.4844 19.1836 35.3047 19.2578 33.8984 19.2578ZM33.8984 7C33.1484 7 32.4766 7.01562 31.8828 7.04688C31.2969 7.07812 30.7812 7.14844 30.3359 7.25781C29.8984 7.35938 29.5234 7.51172 29.2109 7.71484C28.8984 7.91016 28.6445 8.14453 28.4492 8.41797C28.2617 8.68359 28.1211 9.0625 28.0273 9.55469C27.9414 10.0391 27.8984 10.625 27.8984 11.3125H39.1484C39.1484 10.3984 39.0508 9.68359 38.8555 9.16797C38.6602 8.64453 38.3516 8.21484 37.9297 7.87891C37.5078 7.54297 36.9648 7.3125 36.3008 7.1875C35.6367 7.0625 34.8359 7 33.8984 7ZM57.8984 19V11.5C57.8984 10.6641 57.8359 9.96094 57.7109 9.39062C57.5859 8.8125 57.3359 8.34766 56.9609 7.99609C56.5859 7.64453 56.0547 7.39062 55.3672 7.23438C54.6797 7.07812 53.7734 7 52.6484 7C51.4297 7 50.4297 7.08984 49.6484 7.26953C48.875 7.44922 48.2656 7.70312 47.8203 8.03125C47.375 8.35938 47.0664 8.75391 46.8945 9.21484C46.7305 9.67578 46.6484 10.1875 46.6484 10.75V19H44.3984V5.5H46.6484V7.75C46.8125 7.36719 47.0469 7.03906 47.3516 6.76562C47.6562 6.48438 48 6.24609 48.3828 6.05078C48.7656 5.85547 49.1797 5.69922 49.625 5.58203C50.0703 5.45703 50.5156 5.36328 50.9609 5.30078C51.4062 5.23047 51.8359 5.18359 52.25 5.16016C52.6719 5.13672 53.0547 5.125 53.3984 5.125C54.3984 5.125 55.2578 5.1875 55.9766 5.3125C56.7031 5.4375 57.3164 5.62109 57.8164 5.86328C58.3242 6.10547 58.7305 6.40625 59.0352 6.76562C59.3398 7.125 59.5742 7.54297 59.7383 8.01953C59.9102 8.48828 60.0234 9.01562 60.0781 9.60156C60.1328 10.1797 60.1602 10.8125 60.1602 11.5L60.1484 19H57.8984ZM71.0469 19.2578C69.5469 19.2578 68.2734 19.1562 67.2266 18.9531C66.1797 18.7422 65.3281 18.3828 64.6719 17.875C64.0156 17.3672 63.5391 16.6875 63.2422 15.8359C62.9453 14.9844 62.7969 13.9141 62.7969 12.625C62.7969 11.1484 62.9453 9.92969 63.2422 8.96875C63.5391 8 64.0156 7.23047 64.6719 6.66016C65.3281 6.08984 66.1797 5.69141 67.2266 5.46484C68.2734 5.23828 69.5469 5.125 71.0469 5.125C72.1172 5.125 73.043 5.20313 73.8242 5.35938C74.6133 5.51562 75.2852 5.74219 75.8398 6.03906C76.4023 6.33594 76.8555 6.69531 77.1992 7.11719C77.5508 7.53906 77.8242 7.98438 78.0195 8.45312C78.2227 8.91406 78.3594 9.45703 78.4297 10.082C78.5078 10.707 78.5469 11.3672 78.5469 12.0625L78.3594 12.8125H65.0469C65.0469 13.8438 65.1484 14.6914 65.3516 15.3555C65.5547 16.0117 65.8906 16.4922 66.3594 16.7969C66.8281 17.1016 67.4453 17.2969 68.2109 17.3828C68.9766 17.4609 69.9219 17.5 71.0469 17.5C72.0781 17.5 72.9297 17.4727 73.6016 17.418C74.2812 17.3555 74.8203 17.2422 75.2188 17.0781C75.6172 16.9141 75.8945 16.6875 76.0508 16.3984C76.2148 16.1016 76.2969 15.7188 76.2969 15.25H78.5469C78.5469 15.9766 78.418 16.5977 78.1602 17.1133C77.9102 17.6211 77.4922 18.0352 76.9062 18.3555C76.3203 18.668 75.5469 18.8945 74.5859 19.0352C73.6328 19.1836 72.4531 19.2578 71.0469 19.2578ZM71.0469 7C70.2969 7 69.625 7.01562 69.0312 7.04688C68.4453 7.07812 67.9297 7.14844 67.4844 7.25781C67.0469 7.35938 66.6719 7.51172 66.3594 7.71484C66.0469 7.91016 65.793 8.14453 65.5977 8.41797C65.4102 8.68359 65.2695 9.0625 65.1758 9.55469C65.0898 10.0391 65.0469 10.625 65.0469 11.3125H76.2969C76.2969 10.3984 76.1992 9.68359 76.0039 9.16797C75.8086 8.64453 75.5 8.21484 75.0781 7.87891C74.6562 7.54297 74.1133 7.3125 73.4492 7.1875C72.7852 7.0625 71.9844 7 71.0469 7ZM93.1719 9.89453C93.1719 9.33203 93.1289 8.86719 93.043 8.5C92.9648 8.125 92.7734 7.82812 92.4688 7.60938C92.1641 7.38281 91.7109 7.22656 91.1094 7.14062C90.5156 7.04688 89.7031 7 88.6719 7C87.6641 7 86.8438 7.08984 86.2109 7.26953C85.5781 7.44141 85.082 7.6875 84.7227 8.00781C84.3633 8.32812 84.1172 8.71094 83.9844 9.15625C83.8594 9.60156 83.7969 10.0977 83.7969 10.6445V19H81.5469V5.5H83.7969V7.64453C83.875 7.40234 84.0195 7.13672 84.2305 6.84766C84.4414 6.55078 84.7617 6.27734 85.1914 6.02734C85.6211 5.76953 86.1758 5.55469 86.8555 5.38281C87.543 5.21094 88.3984 5.125 89.4219 5.125C90.5938 5.125 91.5469 5.23047 92.2812 5.44141C93.0156 5.64453 93.5859 5.94922 93.9922 6.35547C94.4062 6.75391 94.6836 7.25 94.8242 7.84375C94.9727 8.4375 95.0469 9.12109 95.0469 9.89453H93.1719ZM109.988 17.1484C109.965 17.2422 109.789 17.4766 109.461 17.8516C109.227 18.1328 108.914 18.3828 108.523 18.6016C108.133 18.8125 107.609 18.9766 106.953 19.0938C106.305 19.2188 105.449 19.2812 104.387 19.2812C102.973 19.2812 101.766 19.207 100.766 19.0586C99.7656 18.918 98.9492 18.6992 98.3164 18.4023C97.6836 18.0977 97.2188 17.7109 96.9219 17.2422C96.6328 16.7734 96.4883 16.2148 96.4883 15.5664C96.4883 14.8867 96.5664 14.3125 96.7227 13.8438C96.8867 13.3672 97.1211 12.9688 97.4258 12.6484C97.7383 12.3281 98.1133 12.0781 98.5508 11.8984C98.9883 11.7188 99.4844 11.582 100.039 11.4883C100.602 11.3945 101.215 11.3359 101.879 11.3125C102.543 11.2891 103.25 11.2773 104 11.2773C105.07 11.2773 105.965 11.3242 106.684 11.418C107.402 11.5039 107.988 11.6172 108.441 11.7578C108.902 11.8906 109.25 12.0352 109.484 12.1914C109.719 12.3477 109.887 12.4922 109.988 12.625C109.988 11.75 109.949 11.0039 109.871 10.3867C109.801 9.76953 109.68 9.25391 109.508 8.83984C109.344 8.42578 109.129 8.09766 108.863 7.85547C108.598 7.60547 108.27 7.41797 107.879 7.29297C107.496 7.16797 107.047 7.08984 106.531 7.05859C106.016 7.01953 105.426 7 104.762 7C103.73 7 102.875 7.02734 102.195 7.08203C101.516 7.12891 100.977 7.22656 100.578 7.375C100.18 7.52344 99.8984 7.73047 99.7344 7.99609C99.5703 8.25391 99.4883 8.59375 99.4883 9.01562H97.2383C97.2383 8.30469 97.3633 7.70312 97.6133 7.21094C97.8711 6.71875 98.293 6.32031 98.8789 6.01562C99.4727 5.70312 100.25 5.47656 101.211 5.33594C102.172 5.19531 103.355 5.125 104.762 5.125C106.137 5.125 107.301 5.23828 108.254 5.46484C109.207 5.69141 109.977 6.08984 110.562 6.66016C111.156 7.23047 111.582 8 111.84 8.96875C112.105 9.92969 112.238 11.1484 112.238 12.625V19H109.988V17.1484ZM104.762 17.5C105.754 17.5 106.582 17.4531 107.246 17.3594C107.918 17.2656 108.457 17.125 108.863 16.9375C109.27 16.75 109.559 16.5156 109.73 16.2344C109.902 15.9531 109.988 15.625 109.988 15.25C109.988 14.875 109.887 14.5586 109.684 14.3008C109.488 14.0352 109.156 13.8203 108.688 13.6562C108.227 13.4922 107.613 13.375 106.848 13.3047C106.082 13.2266 105.137 13.1875 104.012 13.1875C102.887 13.1875 101.977 13.207 101.281 13.2461C100.594 13.2852 100.062 13.375 99.6875 13.5156C99.3125 13.6562 99.0586 13.8633 98.9258 14.1367C98.8008 14.4102 98.7383 14.7812 98.7383 15.25C98.7383 15.7188 98.8047 16.1016 98.9375 16.3984C99.0781 16.6875 99.3594 16.9141 99.7812 17.0781C100.203 17.2422 100.809 17.3555 101.598 17.418C102.395 17.4727 103.449 17.5 104.762 17.5ZM128.375 13C128.375 14.1484 128.281 15.1094 128.094 15.8828C127.906 16.6484 127.59 17.2617 127.145 17.7227C126.707 18.1836 126.129 18.5117 125.41 18.707C124.691 18.9023 123.805 19 122.75 19C121.727 19 120.867 18.9219 120.172 18.7656C119.477 18.6094 118.914 18.3438 118.484 17.9688C118.055 17.5938 117.746 17.0938 117.559 16.4688C117.371 15.8438 117.277 15.0625 117.277 14.125V7.35156H114.5V5.5H117.277V1.80859H119.527V5.5H128V7.35156H119.527V14.125C119.527 14.875 119.582 15.4531 119.691 15.8594C119.809 16.2656 119.992 16.5625 120.242 16.75C120.492 16.9375 120.82 17.0469 121.227 17.0781C121.641 17.1094 122.145 17.125 122.738 17.125C123.207 17.125 123.625 17.1172 123.992 17.1016C124.367 17.0859 124.691 17.0391 124.965 16.9609C125.246 16.875 125.484 16.75 125.68 16.5859C125.875 16.4141 126.031 16.1758 126.148 15.8711C126.273 15.5664 126.363 15.1836 126.418 14.7227C126.473 14.2539 126.5 13.6797 126.5 13H128.375ZM138.5 19.2578C137 19.2578 135.727 19.1562 134.68 18.9531C133.633 18.7422 132.781 18.3828 132.125 17.875C131.469 17.3672 130.992 16.6875 130.695 15.8359C130.398 14.9844 130.25 13.9141 130.25 12.625C130.25 11.1484 130.398 9.92969 130.695 8.96875C130.992 8 131.469 7.23047 132.125 6.66016C132.781 6.08984 133.633 5.69141 134.68 5.46484C135.727 5.23828 137 5.125 138.5 5.125C139.57 5.125 140.496 5.20313 141.277 5.35938C142.066 5.51562 142.738 5.74219 143.293 6.03906C143.855 6.33594 144.309 6.69531 144.652 7.11719C145.004 7.53906 145.277 7.98438 145.473 8.45312C145.676 8.91406 145.812 9.45703 145.883 10.082C145.961 10.707 146 11.3672 146 12.0625L145.812 12.8125H132.5C132.5 13.8438 132.602 14.6914 132.805 15.3555C133.008 16.0117 133.344 16.4922 133.812 16.7969C134.281 17.1016 134.898 17.2969 135.664 17.3828C136.43 17.4609 137.375 17.5 138.5 17.5C139.531 17.5 140.383 17.4727 141.055 17.418C141.734 17.3555 142.273 17.2422 142.672 17.0781C143.07 16.9141 143.348 16.6875 143.504 16.3984C143.668 16.1016 143.75 15.7188 143.75 15.25H146C146 15.9766 145.871 16.5977 145.613 17.1133C145.363 17.6211 144.945 18.0352 144.359 18.3555C143.773 18.668 143 18.8945 142.039 19.0352C141.086 19.1836 139.906 19.2578 138.5 19.2578ZM138.5 7C137.75 7 137.078 7.01562 136.484 7.04688C135.898 7.07812 135.383 7.14844 134.938 7.25781C134.5 7.35938 134.125 7.51172 133.812 7.71484C133.5 7.91016 133.246 8.14453 133.051 8.41797C132.863 8.68359 132.723 9.0625 132.629 9.55469C132.543 10.0391 132.5 10.625 132.5 11.3125H143.75C143.75 10.3984 143.652 9.68359 143.457 9.16797C143.262 8.64453 142.953 8.21484 142.531 7.87891C142.109 7.54297 141.566 7.3125 140.902 7.1875C140.238 7.0625 139.438 7 138.5 7ZM174.5 1V2.875H165.5V19H163.25V2.875H154.25V1H174.5ZM189.125 9.89453C189.125 9.33203 189.082 8.86719 188.996 8.5C188.918 8.125 188.727 7.82812 188.422 7.60938C188.117 7.38281 187.664 7.22656 187.062 7.14062C186.469 7.04688 185.656 7 184.625 7C183.617 7 182.797 7.08984 182.164 7.26953C181.531 7.44141 181.035 7.6875 180.676 8.00781C180.316 8.32812 180.07 8.71094 179.938 9.15625C179.812 9.60156 179.75 10.0977 179.75 10.6445V19H177.5V5.5H179.75V7.64453C179.828 7.40234 179.973 7.13672 180.184 6.84766C180.395 6.55078 180.715 6.27734 181.145 6.02734C181.574 5.76953 182.129 5.55469 182.809 5.38281C183.496 5.21094 184.352 5.125 185.375 5.125C186.547 5.125 187.5 5.23047 188.234 5.44141C188.969 5.64453 189.539 5.94922 189.945 6.35547C190.359 6.75391 190.637 7.25 190.777 7.84375C190.926 8.4375 191 9.12109 191 9.89453H189.125ZM205.941 17.1484C205.918 17.2422 205.742 17.4766 205.414 17.8516C205.18 18.1328 204.867 18.3828 204.477 18.6016C204.086 18.8125 203.562 18.9766 202.906 19.0938C202.258 19.2188 201.402 19.2812 200.34 19.2812C198.926 19.2812 197.719 19.207 196.719 19.0586C195.719 18.918 194.902 18.6992 194.27 18.4023C193.637 18.0977 193.172 17.7109 192.875 17.2422C192.586 16.7734 192.441 16.2148 192.441 15.5664C192.441 14.8867 192.52 14.3125 192.676 13.8438C192.84 13.3672 193.074 12.9688 193.379 12.6484C193.691 12.3281 194.066 12.0781 194.504 11.8984C194.941 11.7188 195.438 11.582 195.992 11.4883C196.555 11.3945 197.168 11.3359 197.832 11.3125C198.496 11.2891 199.203 11.2773 199.953 11.2773C201.023 11.2773 201.918 11.3242 202.637 11.418C203.355 11.5039 203.941 11.6172 204.395 11.7578C204.855 11.8906 205.203 12.0352 205.438 12.1914C205.672 12.3477 205.84 12.4922 205.941 12.625C205.941 11.75 205.902 11.0039 205.824 10.3867C205.754 9.76953 205.633 9.25391 205.461 8.83984C205.297 8.42578 205.082 8.09766 204.816 7.85547C204.551 7.60547 204.223 7.41797 203.832 7.29297C203.449 7.16797 203 7.08984 202.484 7.05859C201.969 7.01953 201.379 7 200.715 7C199.684 7 198.828 7.02734 198.148 7.08203C197.469 7.12891 196.93 7.22656 196.531 7.375C196.133 7.52344 195.852 7.73047 195.688 7.99609C195.523 8.25391 195.441 8.59375 195.441 9.01562H193.191C193.191 8.30469 193.316 7.70312 193.566 7.21094C193.824 6.71875 194.246 6.32031 194.832 6.01562C195.426 5.70312 196.203 5.47656 197.164 5.33594C198.125 5.19531 199.309 5.125 200.715 5.125C202.09 5.125 203.254 5.23828 204.207 5.46484C205.16 5.69141 205.93 6.08984 206.516 6.66016C207.109 7.23047 207.535 8 207.793 8.96875C208.059 9.92969 208.191 11.1484 208.191 12.625V19H205.941V17.1484ZM200.715 17.5C201.707 17.5 202.535 17.4531 203.199 17.3594C203.871 17.2656 204.41 17.125 204.816 16.9375C205.223 16.75 205.512 16.5156 205.684 16.2344C205.855 15.9531 205.941 15.625 205.941 15.25C205.941 14.875 205.84 14.5586 205.637 14.3008C205.441 14.0352 205.109 13.8203 204.641 13.6562C204.18 13.4922 203.566 13.375 202.801 13.3047C202.035 13.2266 201.09 13.1875 199.965 13.1875C198.84 13.1875 197.93 13.207 197.234 13.2461C196.547 13.2852 196.016 13.375 195.641 13.5156C195.266 13.6562 195.012 13.8633 194.879 14.1367C194.754 14.4102 194.691 14.7812 194.691 15.25C194.691 15.7188 194.758 16.1016 194.891 16.3984C195.031 16.6875 195.312 16.9141 195.734 17.0781C196.156 17.2422 196.762 17.3555 197.551 17.418C198.348 17.4727 199.402 17.5 200.715 17.5ZM224.703 19V11.5C224.703 10.6641 224.641 9.96094 224.516 9.39062C224.391 8.8125 224.141 8.34766 223.766 7.99609C223.391 7.64453 222.859 7.39062 222.172 7.23438C221.484 7.07812 220.578 7 219.453 7C218.234 7 217.234 7.08984 216.453 7.26953C215.68 7.44922 215.07 7.70312 214.625 8.03125C214.18 8.35938 213.871 8.75391 213.699 9.21484C213.535 9.67578 213.453 10.1875 213.453 10.75V19H211.203V5.5H213.453V7.75C213.617 7.36719 213.852 7.03906 214.156 6.76562C214.461 6.48438 214.805 6.24609 215.188 6.05078C215.57 5.85547 215.984 5.69922 216.43 5.58203C216.875 5.45703 217.32 5.36328 217.766 5.30078C218.211 5.23047 218.641 5.18359 219.055 5.16016C219.477 5.13672 219.859 5.125 220.203 5.125C221.203 5.125 222.062 5.1875 222.781 5.3125C223.508 5.4375 224.121 5.62109 224.621 5.86328C225.129 6.10547 225.535 6.40625 225.84 6.76562C226.145 7.125 226.379 7.54297 226.543 8.01953C226.715 8.48828 226.828 9.01562 226.883 9.60156C226.938 10.1797 226.965 10.8125 226.965 11.5L226.953 19H224.703ZM237.852 12.8477C236.789 12.8477 235.855 12.832 235.051 12.8008C234.246 12.7695 233.551 12.707 232.965 12.6133C232.387 12.5117 231.902 12.3711 231.512 12.1914C231.129 12.0117 230.824 11.7734 230.598 11.4766C230.371 11.1719 230.211 10.8008 230.117 10.3633C230.023 9.91797 229.977 9.4375 229.977 8.92188C229.977 8.21875 230.125 7.62891 230.422 7.15234C230.719 6.66797 231.195 6.27734 231.852 5.98047C232.508 5.67578 233.359 5.45703 234.406 5.32422C235.453 5.19141 236.727 5.125 238.227 5.125C239.711 5.125 240.934 5.20313 241.895 5.35938C242.863 5.51562 243.629 5.75781 244.191 6.08594C244.762 6.40625 245.16 6.8125 245.387 7.30469C245.613 7.79688 245.727 8.38281 245.727 9.0625H243.477C243.477 8.64062 243.395 8.29688 243.23 8.03125C243.074 7.76562 242.797 7.55859 242.398 7.41016C242 7.25391 241.461 7.14844 240.781 7.09375C240.109 7.03125 239.258 7 238.227 7C237.102 7 236.156 7.01562 235.391 7.04688C234.625 7.07812 234.008 7.15625 233.539 7.28125C233.07 7.40625 232.734 7.59766 232.531 7.85547C232.328 8.11328 232.227 8.46875 232.227 8.92188C232.227 9.1875 232.242 9.44922 232.273 9.70703C232.312 9.95703 232.395 10.1641 232.52 10.3281C232.645 10.4922 232.828 10.6172 233.07 10.7031C233.312 10.7891 233.641 10.8555 234.055 10.9023C234.477 10.9414 234.996 10.9648 235.613 10.9727C236.23 10.9727 236.977 10.9727 237.852 10.9727C238.914 10.9727 239.844 10.9961 240.641 11.043C241.445 11.0898 242.141 11.1719 242.727 11.2891C243.312 11.4062 243.797 11.5859 244.18 11.8281C244.562 12.0703 244.867 12.3359 245.094 12.625C245.328 12.9062 245.492 13.2422 245.586 13.6328C245.68 14.0156 245.727 14.4609 245.727 14.9688C245.727 15.4766 245.68 15.9336 245.586 16.3398C245.492 16.7383 245.328 17.0938 245.094 17.4062C244.859 17.7109 244.539 17.9766 244.133 18.2031C243.734 18.4219 243.23 18.6016 242.621 18.7422C242.012 18.875 241.281 18.9727 240.43 19.0352C239.586 19.1055 238.602 19.1406 237.477 19.1406C236.07 19.1406 234.887 19.0703 233.926 18.9297C232.973 18.7891 232.203 18.5664 231.617 18.2617C231.031 17.9492 230.609 17.5469 230.352 17.0547C230.102 16.5625 229.977 15.9609 229.977 15.25H232.227C232.227 15.7188 232.305 16.1016 232.461 16.3984C232.625 16.6875 232.906 16.9141 233.305 17.0781C233.703 17.2422 234.238 17.3555 234.91 17.418C235.59 17.4727 236.445 17.5 237.477 17.5C238.414 17.5 239.211 17.4805 239.867 17.4414C240.531 17.3945 241.086 17.3242 241.531 17.2305C241.977 17.1367 242.328 17.0234 242.586 16.8906C242.844 16.7578 243.039 16.5977 243.172 16.4102C243.305 16.2227 243.387 16.0156 243.418 15.7891C243.457 15.5547 243.477 15.2969 243.477 15.0156C243.477 14.7578 243.457 14.5312 243.418 14.3359C243.387 14.1328 243.309 13.9336 243.184 13.7383C243.059 13.5352 242.875 13.3828 242.633 13.2812C242.391 13.1797 242.059 13.0977 241.637 13.0352C241.223 12.9648 240.707 12.918 240.09 12.8945C239.473 12.8633 238.727 12.8477 237.852 12.8477ZM249.477 1H251.727V19H249.477V1ZM268.918 17.1484C268.895 17.2422 268.719 17.4766 268.391 17.8516C268.156 18.1328 267.844 18.3828 267.453 18.6016C267.062 18.8125 266.539 18.9766 265.883 19.0938C265.234 19.2188 264.379 19.2812 263.316 19.2812C261.902 19.2812 260.695 19.207 259.695 19.0586C258.695 18.918 257.879 18.6992 257.246 18.4023C256.613 18.0977 256.148 17.7109 255.852 17.2422C255.562 16.7734 255.418 16.2148 255.418 15.5664C255.418 14.8867 255.496 14.3125 255.652 13.8438C255.816 13.3672 256.051 12.9688 256.355 12.6484C256.668 12.3281 257.043 12.0781 257.48 11.8984C257.918 11.7188 258.414 11.582 258.969 11.4883C259.531 11.3945 260.145 11.3359 260.809 11.3125C261.473 11.2891 262.18 11.2773 262.93 11.2773C264 11.2773 264.895 11.3242 265.613 11.418C266.332 11.5039 266.918 11.6172 267.371 11.7578C267.832 11.8906 268.18 12.0352 268.414 12.1914C268.648 12.3477 268.816 12.4922 268.918 12.625C268.918 11.75 268.879 11.0039 268.801 10.3867C268.73 9.76953 268.609 9.25391 268.438 8.83984C268.273 8.42578 268.059 8.09766 267.793 7.85547C267.527 7.60547 267.199 7.41797 266.809 7.29297C266.426 7.16797 265.977 7.08984 265.461 7.05859C264.945 7.01953 264.355 7 263.691 7C262.66 7 261.805 7.02734 261.125 7.08203C260.445 7.12891 259.906 7.22656 259.508 7.375C259.109 7.52344 258.828 7.73047 258.664 7.99609C258.5 8.25391 258.418 8.59375 258.418 9.01562H256.168C256.168 8.30469 256.293 7.70312 256.543 7.21094C256.801 6.71875 257.223 6.32031 257.809 6.01562C258.402 5.70312 259.18 5.47656 260.141 5.33594C261.102 5.19531 262.285 5.125 263.691 5.125C265.066 5.125 266.23 5.23828 267.184 5.46484C268.137 5.69141 268.906 6.08984 269.492 6.66016C270.086 7.23047 270.512 8 270.77 8.96875C271.035 9.92969 271.168 11.1484 271.168 12.625V19H268.918V17.1484ZM263.691 17.5C264.684 17.5 265.512 17.4531 266.176 17.3594C266.848 17.2656 267.387 17.125 267.793 16.9375C268.199 16.75 268.488 16.5156 268.66 16.2344C268.832 15.9531 268.918 15.625 268.918 15.25C268.918 14.875 268.816 14.5586 268.613 14.3008C268.418 14.0352 268.086 13.8203 267.617 13.6562C267.156 13.4922 266.543 13.375 265.777 13.3047C265.012 13.2266 264.066 13.1875 262.941 13.1875C261.816 13.1875 260.906 13.207 260.211 13.2461C259.523 13.2852 258.992 13.375 258.617 13.5156C258.242 13.6562 257.988 13.8633 257.855 14.1367C257.73 14.4102 257.668 14.7812 257.668 15.25C257.668 15.7188 257.734 16.1016 257.867 16.3984C258.008 16.6875 258.289 16.9141 258.711 17.0781C259.133 17.2422 259.738 17.3555 260.527 17.418C261.324 17.4727 262.379 17.5 263.691 17.5ZM287.305 13C287.305 14.1484 287.211 15.1094 287.023 15.8828C286.836 16.6484 286.52 17.2617 286.074 17.7227C285.637 18.1836 285.059 18.5117 284.34 18.707C283.621 18.9023 282.734 19 281.68 19C280.656 19 279.797 18.9219 279.102 18.7656C278.406 18.6094 277.844 18.3438 277.414 17.9688C276.984 17.5938 276.676 17.0938 276.488 16.4688C276.301 15.8438 276.207 15.0625 276.207 14.125V7.35156H273.43V5.5H276.207V1.80859H278.457V5.5H286.93V7.35156H278.457V14.125C278.457 14.875 278.512 15.4531 278.621 15.8594C278.738 16.2656 278.922 16.5625 279.172 16.75C279.422 16.9375 279.75 17.0469 280.156 17.0781C280.57 17.1094 281.074 17.125 281.668 17.125C282.137 17.125 282.555 17.1172 282.922 17.1016C283.297 17.0859 283.621 17.0391 283.895 16.9609C284.176 16.875 284.414 16.75 284.609 16.5859C284.805 16.4141 284.961 16.1758 285.078 15.8711C285.203 15.5664 285.293 15.1836 285.348 14.7227C285.402 14.2539 285.43 13.6797 285.43 13H287.305ZM291.055 5.5H293.305V19H291.055V5.5ZM293.305 3.25H291.055V1H293.305V3.25ZM296.68 12.1562C296.68 10.7734 296.828 9.62891 297.125 8.72266C297.422 7.81641 297.898 7.09766 298.555 6.56641C299.211 6.03516 300.062 5.66406 301.109 5.45312C302.156 5.23437 303.43 5.125 304.93 5.125C306.43 5.125 307.703 5.23437 308.75 5.45312C309.797 5.66406 310.648 6.03516 311.305 6.56641C311.961 7.09766 312.438 7.81641 312.734 8.72266C313.031 9.62891 313.18 10.7734 313.18 12.1562C313.18 13.5391 313.031 14.6875 312.734 15.6016C312.438 16.5156 311.961 17.2422 311.305 17.7812C310.648 18.3203 309.797 18.7031 308.75 18.9297C307.703 19.1484 306.43 19.2578 304.93 19.2578C303.43 19.2578 302.156 19.1484 301.109 18.9297C300.062 18.7031 299.211 18.3203 298.555 17.7812C297.898 17.2422 297.422 16.5156 297.125 15.6016C296.828 14.6875 296.68 13.5391 296.68 12.1562ZM298.93 12.1562C298.93 12.9062 298.957 13.5586 299.012 14.1133C299.066 14.668 299.168 15.1445 299.316 15.543C299.473 15.9414 299.688 16.2656 299.961 16.5156C300.234 16.7656 300.594 16.9648 301.039 17.1133C301.484 17.2617 302.023 17.3633 302.656 17.418C303.297 17.4727 304.055 17.5 304.93 17.5C305.68 17.5 306.348 17.4844 306.934 17.4531C307.527 17.4141 308.043 17.332 308.48 17.207C308.926 17.082 309.305 16.9062 309.617 16.6797C309.93 16.4453 310.18 16.1289 310.367 15.7305C310.562 15.332 310.703 14.8438 310.789 14.2656C310.883 13.6797 310.93 12.9766 310.93 12.1562C310.93 11.3516 310.883 10.668 310.789 10.1055C310.703 9.53516 310.562 9.05859 310.367 8.67578C310.18 8.29297 309.93 7.99219 309.617 7.77344C309.305 7.54688 308.926 7.37891 308.48 7.26953C308.043 7.15234 307.527 7.07812 306.934 7.04688C306.348 7.01562 305.68 7 304.93 7C304.18 7 303.508 7.01562 302.914 7.04688C302.328 7.07812 301.812 7.15234 301.367 7.26953C300.93 7.37891 300.555 7.54688 300.242 7.77344C299.93 7.99219 299.676 8.29297 299.48 8.67578C299.293 9.05859 299.152 9.53516 299.059 10.1055C298.973 10.668 298.93 11.3516 298.93 12.1562ZM329.305 19V11.5C329.305 10.6641 329.242 9.96094 329.117 9.39062C328.992 8.8125 328.742 8.34766 328.367 7.99609C327.992 7.64453 327.461 7.39062 326.773 7.23438C326.086 7.07812 325.18 7 324.055 7C322.836 7 321.836 7.08984 321.055 7.26953C320.281 7.44922 319.672 7.70312 319.227 8.03125C318.781 8.35938 318.473 8.75391 318.301 9.21484C318.137 9.67578 318.055 10.1875 318.055 10.75V19H315.805V5.5H318.055V7.75C318.219 7.36719 318.453 7.03906 318.758 6.76562C319.062 6.48438 319.406 6.24609 319.789 6.05078C320.172 5.85547 320.586 5.69922 321.031 5.58203C321.477 5.45703 321.922 5.36328 322.367 5.30078C322.812 5.23047 323.242 5.18359 323.656 5.16016C324.078 5.13672 324.461 5.125 324.805 5.125C325.805 5.125 326.664 5.1875 327.383 5.3125C328.109 5.4375 328.723 5.62109 329.223 5.86328C329.73 6.10547 330.137 6.40625 330.441 6.76562C330.746 7.125 330.98 7.54297 331.145 8.01953C331.316 8.48828 331.43 9.01562 331.484 9.60156C331.539 10.1797 331.566 10.8125 331.566 11.5L331.555 19H329.305Z"
            fill="white"
          />
        </svg>
      </div>
      <div className="w-full border-t border-white-500 mt-5 mb-10" />
      {docReview ? (
        <>wwww</>
      ) : (
        <>
          <DocumentTypeSelector
            options={DocumentTypes}
            changeDocType={handleDocTypeChange}
          ></DocumentTypeSelector>
          <div
            className="my-10 w-full"
            style={{ height: 'calc(100% - 150px)' }}
          >
            {docType === DocumentTypes[0] && (
              <ProductKeyStatementsComponent
                setReviewState={handleViewStateChange}
              ></ProductKeyStatementsComponent>
            )}
          </div>
        </>
      )}
    </div>
  );
}
