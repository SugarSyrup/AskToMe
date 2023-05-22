import React, { useState } from "react";
import { dbService, storageService } from "fbInstace";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from 'firebase/storage';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faComment, faCheck, faImage } from "@fortawesome/free-solid-svg-icons";

import Comments from "components/Home/Comments";
import Modal from "components/Templates/Modal";
import { useSetRecoilState } from "recoil";
import { isSelected, selectedNweet } from "store/atoms";

const Nweet = ({ nweetObj, isOwner, isAdmin }) => {
  const [editing, setEditing] = useState(false);
  const [commenting, setCommenting] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const setSelectedNweet = useSetRecoilState(selectedNweet);
  const _isSelected = useSetRecoilState(isSelected);
  const [ ModalEnable, setModalEnable] = useState(false);
  const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
  console.log(NweetTextRef);
  const onDeleteClick = async () => {
    const ok = window.confirm("정말로 질문을 지우시겠습니까?");
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
        isChecked: false,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  // const onClickComments = (event) => {
  //   event.preventDefault();
  //   setCommenting(true);
  // }
  // const onCommentSubmit = (event) => {
  //   event.preventDefault();
  //   _isSelected(true);
  //   setSelectedNweet(nweetObj);
  // }
  const onNweetClick = (event) => {
    event.preventDefault();
  }

  const onCheckedClick = async (event) => {
    await updateDoc(NweetTextRef, {
      isChecked: true,
    });    
  }

  const onImgClick = () => {
    setModalEnable(true);
  }

  const controlModal = () => {
    setModalEnable(false);
  }

  return (
    <div className="nweet" style={nweetObj.isChecked ? {border: "3px solid #a63393"} : {}}>
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit" style={{paddingBottom:"0px"}}> 
            <textarea
              type="text"
              placeholder="질문을 수정하세요"
              value={newNweet}
              required
              autoFocus
              onChange={onChange}              
              className="formInput"
            />
            <input type="submit" value="질문 업데이트" className="formBtn"/>
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <div onClick={onNweetClick}>
          <pre style={{whiteSpace: "pre-wrap", wordWrap:"anywhere", width:"325px", minHeight:"30px"}}>{nweetObj.text}</pre>
          {nweetObj.attachmentUrl && <FontAwesomeIcon icon={faImage} onClick = {onImgClick} style={{cursor:"pointer"}} className="ImgIcon"/>}
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
            {isAdmin && (
              <span onClick={onCheckedClick}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
            )}
          </div>
          {nweetObj.isChecked && <span className="Answer">질문 답변 완료!!</span>}
        </div>
      )}
      {ModalEnable && (
        <Modal image={nweetObj.attachmentUrl} close={controlModal}></Modal>
      )}
    </div>
  );
};

export default Nweet;