import { authService } from "fbInstace";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import React, {useState} from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
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
                data = createUserWithEmailAndPassword(authService,email,password);
            } else {
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
        } catch (error) {
            console.log(error.code);
        }
        
        
    }
    return(
    <div>
        <form onSubmit={onSubmit}>
            <input name="email" type="text" placeholder="Email" value={email} onChange={onChange} />
            <input name="password" type="password" placeholder="Password" value={password} onChange={onChange} />
            <input type="submit" value={newAccount ? "Create Account" : "LogIn"} />
        </form>
        <div>
            <button>Continue with Google</button>
            <button>Continue with Github</button>
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