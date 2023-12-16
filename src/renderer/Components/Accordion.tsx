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
    'font-sans m-1 h-14 rounded-sm cursor-pointer flex text-[#E9E9E9] align-middle';

  // Conditionally add the background color class based on isSelected
  const backgroundColorClass = isSelected ? 'bg-[#404562]' : 'bg-[#262732]';

  const handleClick = () => {
    setPageName(title);
    app?.updateApp(app.showMenu, title);
  };

  return (
    <div
      className={`${baseClass} ${backgroundColorClass}`}
      style={{ alignItems: 'center', justifyContent: 'space-evenly' }}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

const Accordion: FunctionComponent = () => {
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
    <div className="accordion">
      <AccordionItem title="Funds">
        {menuItems.map((item, index) => (
          <AccordionChildrenItem
            key={index}
            title={item.title}
            isSelected={item.title === pageName}
            setPageName={handlePageChange}
          >
            {item.icon}
            {item.title}
          </AccordionChildrenItem>
        ))}
      </AccordionItem>
      <AccordionItem title="Property">{""}</AccordionItem>
    </div>
  );
};

export default Accordion;
