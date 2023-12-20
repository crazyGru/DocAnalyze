import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { DocumentTypeSelector } from '../Components/DocumentTypeSelector';
import { KFS1DocComponent } from '../Components/KFS1DocComponent';
import { KFS2DocComponent } from '../Components/KFS2DocComponent';



export default function ReviewPage() {
  const app = useContext(AppContext);
  const appName = 'Review Translation';

  const isShow = app?.currentPage === appName ? '' : 'hidden';

  const DocumentTypes = [
    '2 KFS Documents',
    'Single KFS Document'
  ];
  const [docType, setDocType] = useState<string>(DocumentTypes[0]);

  const handleDocTypeChange = (newDocType: string) => {
    setDocType(newDocType);
  };
  return (
    <div className={`${isShow} mt-1 h-full w-full`}>
      {docType === DocumentTypes[0] && (
        <KFS2DocComponent title='Review Translation'>
          <DocumentTypeSelector
            options={DocumentTypes}
            changeDocType={handleDocTypeChange}
            idx={0}
          ></DocumentTypeSelector>
        </KFS2DocComponent>
      )}
      {docType === DocumentTypes[1] && (
        <KFS1DocComponent title='Review Translation'>
          <DocumentTypeSelector
            options={DocumentTypes}
            changeDocType={handleDocTypeChange}
            idx={1}
          ></DocumentTypeSelector>
        </KFS1DocComponent>
      )}
    </div>
  );
}
