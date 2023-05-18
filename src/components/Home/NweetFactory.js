import React, {useEffect, useState} from "react";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 } from 'uuid';

import { dbService, storageService } from "fbInstace";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");
    
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
    const onSubmit = async (event) => {
        event.preventDefault();    
        if (nweet === "") {
            return;
          }
        
        let attachmentUrl = "";
        if (attachment !== "") {
            console.log(attachment);
            const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
            const response = await uploadString(attachmentRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(response.ref);
        }
        const nweetObj = {
            text:nweet,
            createdAt: Date.now(),
            cretedAtString : new Date().toString(),
            creatorId : userObj.uid,
            comments: [],
            attachmentUrl,
        };
        await addDoc(collection(dbService, "nweets"), nweetObj);
        setNweet("");
        setAttachment("");
    }
    const onClearPhoto = () => {
        setAttachment("");
    }
    return(
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <textarea
                    className="factoryInput__input"
                    onChange={onChange}
                    placeholder="익명 질문을 자유롭게 남겨주세요"
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photo</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input         
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                opacity: 0,
            }}/>
            {attachment && (
                <div className="factoryForm__attachment">
                    <img
                        src={attachment}
                        style={{
                            backgroundImage: attachment,
                        }}
                    />
                    <div className="factoryForm__clear" onClick={onClearPhoto}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    )
}

export default NweetFactory;