import React, { useState, FunctionComponent } from 'react';
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem: FunctionComponent<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="accordion-item">
      <div onClick={() => setIsOpen(!isOpen)} className="accordion-header rounded-md p-4 bg-[#131420] text-[#A0A0A0] w-full text-left text-lg cursor-pointer border border-[#222436] flex justify-between">
        <div>{title}</div>
        <div>{isOpen?<FaChevronDown />:<FaChevronRight />}</div>
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default AccordionItem;
