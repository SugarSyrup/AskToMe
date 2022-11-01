import { authService } from "fbInstace";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup} from "firebase/auth"
import React, {useState} from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const onChange = (event) => {
        const {target : {name, value}} = event;
        if(name === "email") {
            setEmail(value);
        }
        if(name === "password") {
            setPassword(value);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if(newAccount) {
                data = await createUserWithEmailAndPassword(authService,email,password);
            } else {
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
        } catch (error) {
            console.log(error.message);
            setErrorMsg(error.message);
        }
    }

    const toggleAccount = () => setNewAccount((prev) => !prev);
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
    <div>
        <form onSubmit={onSubmit}>
            <input name="email" type="email" placeholder="Email" value={email} onChange={onChange} />
            <input name="password" type="password" placeholder="Password" value={password} onChange={onChange} />
            <input type="submit" value={newAccount ? "Create Account" : "LogIn"} />
            <span onClick={toggleAccount}> {newAccount? "Log IN" : "Create New Account"} </span>
            {errorMsg}
        </form>
        <div>
            <button name="google" onClick={onSocialClick}>Continue with Google</button>
            <button name="github" onClick={onSocialClick}>Continue with Github</button>
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