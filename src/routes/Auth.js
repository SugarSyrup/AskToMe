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
            console.log(error);
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