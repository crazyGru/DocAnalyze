import React, { useState } from 'react';
import { Document as PDFDocument, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Set workerSrc property to the pdfjs worker.
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const PdfPreviewer = ({ file }: { file: string }) => {
  const [numPages, setNumPages] = useState<number | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <PDFDocument file={file} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </PDFDocument>
      <PDFDocument
                  className="pdf-container"
                  renderMode="canvas"
                  onLoadSuccess={onDocumentLoadSuccess}
                  file={`data:application/pdf;base64,${file}`}
                >
                  {Array.from({ length: numPages || 0 }).map((_, i) => (
                    <Page
                      scale={1.3}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      key={`page_${i}`}
                      pageNumber={i + 1}
                    />
                  ))}
                </PDFDocument>
    </div>
  );
};

