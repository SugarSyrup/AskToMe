import React, {useEffect, useState} from "react";

import { dbService } from "fbInstace";
import { addDoc, collection, getDocs, onSnapshot, query, orderBy } from "firebase/firestore";
import Nweet from "components/Nweet";

const Home = (props) => {
    const { userObj } = props;

    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const getNweets = async() => {
        const dbNweets = await getDocs(collection(dbService, "nweets"));
        dbNweets.forEach((document) => {
            const nweetObject = {
                ...document.data(),
                id: document.id,
            }
            setNweets(prev => [nweetObject, ...prev]);
        });
    }
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
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), {
                text:nweet,
                createdAt: Date.now(),
                creatorId : userObj.uid
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
            
            setNweet("");
    }
    const  onChange = (event) => {
        const {target :{value}} = event;
        setNweet(value);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="What's on your mind?" maxLength={20} onChange={onChange} value={nweet}/>
                <input type="submit" value="Nweet" />
            </form>
            {
                nweets.map((nweet) => (
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))
            }
        </div>
    );
}


export default Home;