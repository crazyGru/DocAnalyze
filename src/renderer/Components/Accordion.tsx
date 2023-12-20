import React, { FunctionComponent, useState, useContext } from 'react';
import AccordionItem from './AccordionItem';
import { FaThumbsUp } from 'react-icons/fa';
import { FaDharmachakra } from 'react-icons/fa';
import { FaWrench } from 'react-icons/fa';
import { AppContext } from '../App';

interface AccordionChildrenItemProps {
  children: React.ReactNode;
  title: string;
  isSelected: boolean;
  setPageName: (pageName: string) => void;
}

const AccordionChildrenItem: FunctionComponent<AccordionChildrenItemProps> = ({
  children,
  title,
  isSelected,
  setPageName,
}) => {
  const app = useContext(AppContext);
  // Define a base class string
  const baseClass =
    'font-sans h-12 text-sm cursor-pointer flex text-[#E9E9E9] align-middle';

  // Conditionally add the background color class based on isSelected
  const backgroundColorClass = isSelected ? 'bg-[#404562]' : 'bg-[#262732]';

  const handleClick = () => {
    setPageName(title);
    app?.updateApp(app.showMenu, title);
  };

  return (
    <div
      className={`${baseClass} ${backgroundColorClass} items-center justify-start pl-4 space-x-4`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

interface AccordionProps {
  isHover: boolean;
};

const Accordion: FunctionComponent<AccordionProps> = ({isHover}) => {
  const menuItemTitles = [
    'Review Translation',
    'Generate Translation',
    'Update Translation',
  ];
  const menuItems = [
    { title: menuItemTitles[0], icon: <FaThumbsUp /> },
    { title: menuItemTitles[1], icon: <FaDharmachakra /> },
    { title: menuItemTitles[2], icon: <FaWrench /> },
  ];

  const [pageName, setPageName] = useState<string>(menuItemTitles[0]);

  const handlePageChange = (newPage: string) => {
    setPageName(newPage);
  };

  return (
    <div className="rounded accordion">
      <AccordionItem isHover={isHover} title="Funds">
        {menuItems.map((item, index) => (
          <AccordionChildrenItem
            key={index}
            title={item.title}
            isSelected={item.title === pageName}
            setPageName={handlePageChange}
          >
            <div>{item.icon}</div>
            {isHover&&<div className='whitespace-nowrap'>{item.title}</div>}
          </AccordionChildrenItem>
        ))}
      </AccordionItem>
      <AccordionItem isHover={isHover} title="Property">{""}</AccordionItem>
    </div>
  );
};

export default Accordion;
