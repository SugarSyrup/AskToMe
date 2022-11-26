import React from "react";

import { authService } from "fbInstace";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup} from "firebase/auth"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import AuthForm from "components/AuthForm";

const Auth = () => {
    const onSocialClick = async (event) => {
        const {target: {name},
        } = event;
        
        let provider;
        if(name === "google") {
            provider = new GoogleAuthProvider();
        } else if(name === "github") {
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
        console.log(data);
    }

    return(
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm />
            <div className="authBtns">
                <button onClick={onSocialClick} name="google" className="authBtn">
                Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button onClick={onSocialClick} name="github" className="authBtn">
                Continue with Github <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    );
}

export default Auth;




// Promise {<pending>}
// [[Prototype]]
// : 
// Promise
// [[PromiseState]]
// : 
// "rejected"
// [[PromiseResult]]
// : 
// FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password). at _errorWithCustomMessage (http://localhost:3000/main.cf3e3776ae134ccca9ae.hot-update.js:853:18) at _performFetchWithErrorHandling (http://localhost:3000/main.cf3e3776ae134ccca9ae.hot-update.js:1628:15) at async _performSignInRequest (http://localhost:3000/main.cf3e3776ae134ccca9ae.hot-update.js:1646:26) at async createUserWithEmailAndPassword (http://localhost:3000/main.cf3e3776ae134ccca9ae.hot-update.js:6927:20)
// code
// : 
// "auth/weak-password"
// customData
// : 
// {appName: '[DEFAULT]'}
// name
// : 
// "FirebaseError"
// message
// : 
// "Firebase: Password should be at least 6 characters (auth/weak-password)."
// stack
// : 
// "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).\n    at _errorWithCustomMessage (http://localhost:3000/main.cf3e3776ae134ccca9ae.hot-update.js:853:18)\n    at _performFetchWithErrorHandling (http://localhost:3000/main.cf3e3776ae134ccca9ae.hot-update.js:1628:15)\n    at async _performSignInRequest (http://localhost:3000/main.cf3e3776ae134ccca9ae.hot-update.js:1646:26)\n    at async createUserWithEmailAndPassword (http://localhost:3000/main.cf3e3776ae134ccca9ae.hot-update.js:6927:20)"
// [[Prototype]]
// : 
// Error