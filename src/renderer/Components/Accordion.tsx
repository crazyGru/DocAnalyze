import React, { FunctionComponent } from 'react';
import AccordionItem from './AccordionItem';
import { FaThumbsUp } from 'react-icons/fa';
import { FaDharmachakra } from 'react-icons/fa';
import { FaWrench } from 'react-icons/fa';

interface AccordionChildrenItemProps {
  children: React.ReactNode;
}

const AccordionChildrenItem: FunctionComponent<AccordionChildrenItemProps> = ({children}) => {
  return (
    <div className="font-sans bg-[#262732] m-1 h-14 rounded-sm cursor-pointer flex text-[#E9E9E9] align-middle"
    style={{alignItems:"center", justifyContent:"space-evenly"}}>
      {children}
    </div>
  );
};

const Accordion: FunctionComponent = () => {
  return (
    <div className="accordion">
      <AccordionItem title="Funds">
        <AccordionChildrenItem>
          <FaThumbsUp />
          Review Translation
        </AccordionChildrenItem>
        <AccordionChildrenItem>
          <FaDharmachakra />
          Generate Translation
        </AccordionChildrenItem>
        <AccordionChildrenItem>
          <FaWrench />
          Update Translation
        </AccordionChildrenItem>
      </AccordionItem>
      <AccordionItem title="Property">NotYet</AccordionItem>
    </div>
  );
};

export default Accordion;
