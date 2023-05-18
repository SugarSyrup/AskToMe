import React from "react";

function Modal ({image, close}) {

    return (
        <div className="background" onClick={close}>
            <div className="modal">
                <img src={image} />
            </div>
        </div>
    );
}

export default Modal;