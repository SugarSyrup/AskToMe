import React from "react";

const Comments = ({comments_data}) => {
    return(
        <>
            {comments_data && comments_data.map((comment) => {
                // <Comment
                //     text={comment.text}
                //     key={comment.key}
                // />
            })}
        </>
    )
}

export default Comments;