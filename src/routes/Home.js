import React, {useEffect, useState} from "react";
import { addDoc, collection, getDocs, onSnapshot, query, orderBy } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 } from 'uuid';

import { dbService, storageService } from "fbInstace";

import Nweet from "components/Nweet";

const Home = (props) => {
    const { userObj } = props;

    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState();
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
        
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
            const response = await uploadString(attachmentRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(response.ref);
        }
        const nweetObj = {
            text:nweet,
            createdAt: Date.now(),
            creatorId : userObj.uid,
            attachmentUrl,
        };
        await addDoc(collection(dbService, "nweets"), nweetObj);
        setNweet("");
        setAttachment("");

        // try {
        //     const docRef = await addDoc(collection(dbService, "nweets"), {
        //         text:nweet,
        //         createdAt: Date.now(),
        //         creatorId : userObj.uid
        //     });
        //     console.log("Document written with ID: ", docRef.id);
        // } catch (error) {
        //     console.error("Error adding document: ", error);
        // }            
        // setNweet("");
    }
    const  onChange = (event) => {
        const {target :{value}} = event;
        setNweet(value);
    }
    const onFileChange = (event) => {
        event.preventDefault();
        const {target : {files}, } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget : {result},} = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }
    const onClearPhoto = () => {
        setAttachment("");
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="What's on your mind?" maxLength={20} onChange={onChange} value={nweet}/>
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Nweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearPhoto}>Clear</button>
                    </div>
                )}
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