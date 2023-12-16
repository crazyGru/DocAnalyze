import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React, { createContext, useContext, useState } from 'react';
import './App.css';
import ReviewPage from './Pages/ReviewPage';
import Header from './Components/Header';
import Menu from './Components/Menu';
import GeneratePage from './Pages/GeneratePage';
import SignPage from './Pages/Sign';
import UpdatePage from './Pages/UpdatePage';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.compat.css'; // If you're using animation


interface AppContextType {
  showMenu: boolean;
  currentPage : string;
  isSignIn : boolean;
  updateApp: (showMenu: boolean, currentPage:string) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export default function App() {
  const pageTitles = [
    "Review Translation",
    "Generate Translation",
    "Update Translation"
  ]
  const [app, setApp] = useState({ showMenu: true, currentPage: pageTitles[0], isSignIn: false});
  const updateApp = (showMenu: boolean, currentPage : string) => {
    const key = localStorage.getItem("auth-token");
    if(key===null){
      setApp({ showMenu, currentPage, isSignIn:false});
    }else{
      setApp({ showMenu, currentPage, isSignIn:true});
    }
  };

  return (
    <AppContext.Provider value={{...app, updateApp}}>
      <div className="bg-[#131420] w-screen h-screen">
        <ReactNotifications/>
        {!app.isSignIn&&(<SignPage></SignPage>)}
        {app.isSignIn&&(<>
        <Header></Header>
        <div className="flex p-1" style={{ height: 'calc(100% - 72px)' }}>
          <Menu></Menu>
          <ReviewPage></ReviewPage>
          <GeneratePage></GeneratePage>
          <UpdatePage></UpdatePage>
        </div></>
        )
        }
      </div>
    </AppContext.Provider>
  );
}
