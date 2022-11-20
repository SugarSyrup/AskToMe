import React, {useEffect, useState} from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbInstace';
import app from 'fbInstace';

function App() {
  const [initialize, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setUserObj(user);
      }
      setInit(true);
    })
  }, [])
  return (
    <>
      { initialize ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj}/> : "Initializing....."}
      <footer>&copy; Nwitter {new Date().getFullYear()} </footer>
    </>
  );
}

export default App;
