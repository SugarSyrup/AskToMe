import React, {useState} from "react";
import { authService } from "fbInstace";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";

const AuthForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [newAccount, setNewAccount] = useState(false);

    const onSubmit = async (data) => {
        const {email, password} = data;
        if(newAccount && data.passwordCheck&& data.password !== data.passwordCheck) {
            window.alert("비밀번호가 일치 하지 않습니다.")
            return;
        }

        if(newAccount) {
            await createUserWithEmailAndPassword(authService,email,password)
                .then(() => {})
                .catch((error) => {
                    window.alert(error);
                });
        } else {
            await signInWithEmailAndPassword(authService, email, password);
        }
    }

    const toggleAccount = () => setNewAccount((prev) => !prev);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container">
            <input {...register('email', {required: true})} type="email" placeholder="Email" className="authInput"/>
            {errors.email && <p style={{color:"red"}}>Username is required</p>}
            <input {...register('password')} type="password" placeholder="Password" className="authInput" />
            {errors.password && <p style={{color:"red"}}>password is required</p>}
            { newAccount ? <input {...register('passwordCheck')} type="password" placeholder="Password Check" className="authInput" /> : <></>}            
            <input type="submit" value={newAccount ? "Create Account" : "LogIn"} className="authInput authSubmit" />
            <span onClick={toggleAccount} className="authSwitch"> {newAccount? "Log IN" : "Create New Account"} </span>
        </form>
    )
}

export default AuthForm;