import React, {useEffect, useState} from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import { dbService } from "fbInstace";

import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { useRecoilState } from "recoil";
import { allNweets } from "atoms";

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useRecoilState(allNweets);
    
    useEffect(() => {
        const q = query(
            collection(dbService, "nweets"),
            orderBy("createdAt", "desc")
        );

        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArr);
        });
    }, [])

    console.log(nweets);
    
    return (
        <div className="container">
            <NweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
            {
                nweets.map((nweet) => (
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                    //@ToDo
                    // nweet.comments.map((comment) => (
                    //     <Comment
                    // ))
                ))
            }
            </div>
        </div>
    );
}


export default Home;