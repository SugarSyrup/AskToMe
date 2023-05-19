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
    const [myNweets, setMyNweets] = useState([]);
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
        const q = query(
            collection(dbService, "nweets"),
            orderBy("createdAt", "desc")
        );

        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => {
                return ({
                    id: doc.id,
                    ...doc.data(),
                })
                // if (doc.data().creatorId === userObj.uid) {
                //     return ({
                //         id: doc.id,
                //         ...doc.data(),
                //     })
                // }
            });

            setMyNweets(nweetArr);
        });

        //console.log(userObj);

        // // var tmp = [];
        // const q = query(
        //     collection(dbService, "nweets"),
        //     orderBy("createdAt", "desc")
        // );
            
        // getDocs(q)
        //     .then((response) => {
        //         response.forEach((doc) => {
        //             // console.log(userObj);
        //             // console.log(doc.data());
        //             if(doc.data().creatorId == userObj.uid){
        //                 // console.log(doc.data());
        //                 setMyNweets((prev) => [...prev, doc.data()]);
        //             }
        //         })
        //     })
        // console.log(tmp);
        // setMyNweets(tmp);
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
                {/* <input type="text" placeholder="Display Name" onChange={onChange} autoFocus className="formInput"/>
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                /> */}
                <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                    Log Out
                </span>
            </form>
            {   
                myNweets.length !== 0 && myNweets.map((myNweet) => {
                    if(myNweet.creatorId === userObj.uid){
                        return (
                            <Nweet
                                key={myNweet.createdAt}
                                nweetObj={myNweet}
                                isOwner={true}
                                isAdmin={userObj.email === "jini203802@gmail.com"}
                            />
                        )
                    }
                })
            }
        </div>
    );
}

export default Profile;