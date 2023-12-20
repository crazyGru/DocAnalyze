import React, { useState, FunctionComponent } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';

interface AccordionItemProps {
  isHover: boolean;
  title: string;
  children: React.ReactNode;
}

const AccordionItem: FunctionComponent<AccordionItemProps> = ({
  isHover,
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="rounded accordion-item">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="rounded accordion-header p-4 py-1 h-12 bg-[#131420] text-[#A0A0A0] w-full text-left text-sm cursor-pointer flex justify-between items-center"
      >
        <div className='flex items-center'>
          <FaBars />
          &nbsp;&nbsp;&nbsp;&nbsp;
          {isHover&&title}
        </div>
        {isHover&&<div>{isOpen ? <FaChevronDown /> : <FaChevronRight />}</div>}
      </div>
      {isOpen && <div className="rounded accordion-content">{children}</div>}
    </div>
  );
};

export default AccordionItem;
