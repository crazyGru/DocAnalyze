import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React, { createContext, useContext, useState } from 'react';
import icon from '../../assets/icon.svg';
import './App.css';
import ReviewPage from './Pages/ReviewPage';
import Header from './Components/Header';
import Menu from './Components/Menu';
import GeneratePage from './Pages/GeneratePage';

interface AppContextType {
  showMenu: boolean;
  currentPage : string;
  updateApp: (showMenu: boolean, currentPage:string) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export default function App() {
  const pageTitles = [
    "Review Translation",
    "Generate Translation",
    "Update Translation"
  ]
  const [app, setApp] = useState({ showMenu: true, currentPage: pageTitles[0]});
  const updateApp = (showMenu: boolean, currentPage : string) => {
    setApp({ showMenu, currentPage });
  };

  return (
    <AppContext.Provider value={{...app, updateApp}}>
      <div className="bg-[#131420] w-screen h-screen">
        <Header></Header>
        <div className="flex p-1" style={{ height: 'calc(100% - 72px)' }}>
          <Menu></Menu>
          <ReviewPage></ReviewPage>
          <GeneratePage></GeneratePage>
        </div>
      </div>
    </AppContext.Provider>
  );
}
