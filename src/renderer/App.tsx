import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React, { createContext, useContext } from 'react';
import icon from '../../assets/icon.svg';
import './App.css';
import ReviewPage from './Pages/ReviewPage';
import Header from './Components/Header';
import Menu from './Components/Menu';

interface AppContextType {
  showMenu : boolean;
}

export default function App() {
  return (
    <div className="bg-[#131420] w-screen h-screen">
      <Header></Header>
      <div className='flex p-1' style={{height:'calc(100% - 72px)'}}>
        <Menu></Menu>
          <Router>
            <Routes>
              <Route path="/" element={<ReviewPage />} />
            </Routes>
          </Router>
      </div>
    </div>
  );
}
