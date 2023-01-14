import React, { useState } from "react";
import { dbService, storageService } from "fbInstace";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from 'firebase/storage';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faComment } from "@fortawesome/free-solid-svg-icons";

import Comments from "components/Comments";
import { useSetRecoilState } from "recoil";
import { isSelected, selectedNweet } from "nweets";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [commenting, setCommenting] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const setSelectedNweet = useSetRecoilState(selectedNweet);
  const _isSelected = useSetRecoilState(isSelected);
  const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
  console.log(NweetTextRef);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
        await deleteDoc(NweetTextRef);
        if(nweetObj.attachmentUrl){
          const deleteRef = ref(storageService, nweetObj.attachmentUrl);
          await deleteObject(deleteRef);
        }
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(NweetTextRef, {
        text: newNweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  const onClickComments = (event) => {
    event.preventDefault();
    setCommenting(true);
  }
  const onCommentSubmit = (event) => {
    event.preventDefault();
    _isSelected(true);
    setSelectedNweet(nweetObj);
  }
  const onNweetClick = (event) => {
    event.preventDefault();
  }
  return (
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit"> 
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              autoFocus
              onChange={onChange}              
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn"/>
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <div onClick={onNweetClick}>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
          <div className="nweet__actions">
          {isOwner && (
            <>
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </>
          )}
          <span onClick={onClickComments}>
                <FontAwesomeIcon icon={faComment} />
              </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nweet;