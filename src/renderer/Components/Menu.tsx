import Accordion from './Accordion';
import { useContext } from 'react';
import { AppContext } from '../App';

function Menu() {
  const app = useContext(AppContext);
  const isShow = app?.showMenu ? '' : 'hidden';
  return (
    <div className={`${isShow} w-64 h-full rounded-md	bg-[#1B1D2A] ml-1 mt-1 border border-[#222436]`}>
      <Accordion></Accordion>
    </div>
  );
}

export default Menu;
