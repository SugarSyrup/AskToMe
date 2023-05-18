import React from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Auth from "pages/Auth";
import Home from "pages/Home";
import Profile from "pages/Profile"
import Navigation from "components/Navigation";
import Modal from "components/Templates/Modal";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {

    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <div
                style={{
                    maxWidth: 890,
                    width: "100%",
                    margin: "0 auto",
                    marginTop: 80,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
            <Routes>
                { isLoggedIn ? 
                    <>
                        <Route exact path="/" element={ <Home userObj={userObj} /> } />
                        <Route exact path="/profile" element={ <Profile userObj={userObj} refreshUser={refreshUser} /> } />
                    </>
                : <Route exact path="/*" element={ <Auth /> } />
                }      
            </Routes>
            
            </div>
        </Router>
    );
};

export default AppRouter;