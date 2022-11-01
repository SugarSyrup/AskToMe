import React from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "fbInstace";

const Profile = () => {
    const navigate = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    }

    return (<>
        <button onClick={onLogOutClick}>LOG OUT</button>
    </>);
}

export default Profile;