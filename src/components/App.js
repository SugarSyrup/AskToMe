import React, {useEffect, useState} from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbInstace';
import app from 'fbInstace';

function App() {
  const [initialize, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      console.log(Boolean(user));
      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])
  return (
    <>
      { initialize ? <AppRouter isLoggedIn={ isLoggedIn }/> : "Initializing....."}
      <footer>&copy; Nwitter {new Date().getFullYear()} </footer>
    </>
  );
}

export default App;
