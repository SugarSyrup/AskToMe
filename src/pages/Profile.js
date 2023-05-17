import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService,dbService } from "fbInstace";
import { updateProfile } from "@firebase/auth";
import { collection, getDocs, query, where, orderBy, onSnapshot, getFirestore, getDoc } from "@firebase/firestore";

import Nweet from "components/Home/Nweet";
import { useRecoilValue } from "recoil";
import { getMyNeewts } from "store/atoms";

const Profile = ({ userObj, refreshUser }) => {
    const [displayName, setDisplayName] = useState(userObj.displayName);
    //todo : selector로 바꾸기
    //const myNweets = useRecoilValue(getMyNeewts);

    const navigate = useNavigate();

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
        refreshUser();
    }
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

    useEffect(() => {
        // if(myNweets.length === 0) {
        //     const q = query(
        //         collection(dbService, "nweets"),
        //         orderBy("createdAt", "desc")
        //     );
    
        //     onSnapshot(q, (snapshot) => {
        //         const nweetArr = snapshot.docs.map((doc) => ({
        //             id: doc.id,
        //             ...doc.data(),
        //         }));
        //         setNweets(nweetArr);
        //     });
        // }
    }, [])

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
            {/* {   
                myNweets.length !== 0 && myNweets.map((myNweet) => (
                    <Nweet
                        key={myNweet.createdAt}
                        nweetObj={myNweet}
                        isOwner={true}
                    />
                ))
            } */}
        </div>
    );
}

export default Profile;