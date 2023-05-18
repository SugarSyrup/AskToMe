import React, {useEffect, useState} from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import { dbService } from "fbInstace";

import Nweet from "components/Home/Nweet";
import NweetFactory from "components/Home/NweetFactory";
import { useRecoilState } from "recoil";
import { allNweets } from "store/atoms";

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useRecoilState(allNweets);
    //const [nweets, setNweets] = useState(allNweets);
    // const userData
    
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
    }, []);
    
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
                        isAdmin={userObj.email === "jini203802@gmail.com"}
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