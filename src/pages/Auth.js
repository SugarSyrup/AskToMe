import React from "react";

import { authService } from "fbInstace";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup} from "firebase/auth"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCookieBite } from "@fortawesome/free-solid-svg-icons";

import AuthForm from "components/Auth/AuthForm";

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
    }

    return(
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faCookieBite}
                color={"#FFBABA"}
                size="3x"
                style={{ marginBottom: 30, fontSize:"60px" }}
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
