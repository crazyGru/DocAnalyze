import React, { useState, FunctionComponent } from 'react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem: FunctionComponent<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-item">
      <div onClick={() => setIsOpen(!isOpen)} className="accordion-header rounded-md p-4 bg-[#131420] text-[#A0A0A0] w-full text-left text-lg cursor-pointer border border-[#222436]">
        {title}
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default AccordionItem;
