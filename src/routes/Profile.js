import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService,dbService } from "fbInstace";
import { updateProfile } from "@firebase/auth";
import { collection, getDocs, query, where, orderBy } from "@firebase/firestore";

import Nweet from "components/Nweet";
import { useRecoilState, useRecoilValue } from "recoil";
import { allNweets, getAllNweets } from "atoms";

const Profile = ({ userObj, refreshUser }) => {
    const [displayName, setDisplayName] = useState(userObj.displayName);
    const [myNweets, _] = useState(useRecoilValue(allNweets).filter((nweet) => nweet.creatorId === userObj.uid));
    const v = useRecoilValue(getAllNweets);
    
    const navigate = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
        refreshUser();
    }

    // const getMyNweets = async () => {
    //     const docsQuery = query(
    //         collection(dbService, "nweets"),
    //         where("creatorId", "==", userObj.uid),
    //         orderBy("createdAt", "desc")
    //     );
    //     setMyNweets(await getDocs(docsQuery));
    // }

    const onChange = (event) => {
        const {
            target: {value}
        } = event;
        setDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        await updateProfile(authService.currentUser, { displayName });
        refreshUser();
    }

    // useEffect(() => {
    //     getMyNweets();
    // },[]);

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input type="text" placeholder="Display Name" onChange={onChange} autoFocus className="formInput"/>
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                />
                <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                    Log Out
                </span>
            </form>
            {   
                myNweets.length !== 0 && myNweets.map((myNweet) => (
                    <Nweet
                        key={myNweet.createdAt}
                        nweetObj={myNweet}
                        isOwner={true}
                    />
                ))
            }
        </div>
    );
}

export default Profile;