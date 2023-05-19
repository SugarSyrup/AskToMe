import React, {useEffect, useState} from 'react';
import AppRouter from '../Router';
import { authService } from 'fbInstace';

function App() {
  const [initialize, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const refreshUser = () => {
    //todo : accesstoken 들어있음, 필요한 user data만 저장
    setUserObj(Object.assign({}, authService.currentUser));
  }

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    })
  }, [])
  return (
    <>
      { initialize ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser}/> : "Initializing....."}
      <footer> 
        <span>&copy; AskToMe! FrontEnd Web Developer <b>SugarSyrup</b> {new Date().getFullYear()}</span>
        <span>Contact Us : tlfvm04@naver.com</span>
      </footer>
    </>
  );
}

export default App;
