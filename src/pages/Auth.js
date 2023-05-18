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
            <h1 style={{marginBottom:"20px", fontSize:"36px", fontWeight:"bolder"}}>Ask To Me!</h1>
            <h4 style={{marginBottom:"10px", fontSize:"16px"}}>처음 접속하신다면, Create New Account를 통해 회원가입 or 소셜 로그인을 해주세요</h4>
            <h4 style={{marginBottom:"80px", fontSize:"14px"}}>회원가입을 위한 Email과 password정보는 모두 본인이 작성한 글 수정/삭제 용으로 사용됩니다.</h4>
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
