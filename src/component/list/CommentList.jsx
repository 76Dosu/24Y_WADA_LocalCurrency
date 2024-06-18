import React from "react";
import styled from "styled-components";
import CommentItem from "../items/CommentItem";

// image

const Wrapper = styled.div`
    width:100%;
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding:12px 0px 8px 0px;
    margin-bottom:12px;
`

function CommentList(props) {

    const { postInfo, comments } = props;

    return (
        <Wrapper>
            
            {comments.map((comment, index) => {
                return (
                    <CommentItem key={comment.id} comment={comment} postInfo={postInfo}></CommentItem>
                )
            })}
        </Wrapper>
    )

}

export default CommentList;