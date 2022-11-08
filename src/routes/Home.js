import React, {useState} from "react";

import { dbService } from "fbInstace";
import { addDoc, collection } from "firebase/firestore";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), {
                nweet,
                createdAt: Date.now(),
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
        </div>
    );
}


export default Home;