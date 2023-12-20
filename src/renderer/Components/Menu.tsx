import React, { useContext, useState } from 'react';
import Accordion from './Accordion';
import { AppContext } from '../App';

function Menu() {
  const app = useContext(AppContext);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    console.log(app.showMenu, isHovered);
    console.log(isHovered || app?.showMenu);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    console.log(app.showMenu, isHovered);
    setIsHovered(false);
  };

  const width = app?.showMenu || isHovered ? 'w-[300px]' : 'w-[50px]';

  return (
    <div
      className={`rounded overflow-hidden transition-all duration-300 ${width} h-full bg-[#1B1D2A] ml-1 mt-1 border border-[#222436]`}
      onMouseOver={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Accordion isHover={isHovered || app?.showMenu} />
    </div>
  );
}

export default Menu;
