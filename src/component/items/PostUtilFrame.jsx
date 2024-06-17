import React from "react";
import styled from "styled-components";

// compotents

// image
import likeIcon from "../../images/like.png"
import commentIcon from "../../images/comment.png"

// styled
const Wrapper = styled.div`
    width:100%;
    display:flex;
    align-items: center;
    margin-top:16px;

    gap:24px;
`

const LikeFrame = styled.div`
    width:fit-content;
    display:flex;
    align-items:center;
`

const LikeIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-right:8px;
`

const LikeText = styled.p`
    font-size:16px;
`

const CommnetFrame = styled.div`
    width:fit-content;
    display:flex;
    align-items:center;
`

const CommentIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-right:8px;
`

const CommentText = styled.p`
    font-size:16px;
`

function UtilFrame(props){


    return (

        <Wrapper>
            <LikeFrame>
                <LikeIcon src={likeIcon}></LikeIcon>
                <LikeText>35</LikeText>
            </LikeFrame>
            <CommnetFrame>
                <CommentIcon src={commentIcon}></CommentIcon>
                <CommentText>21</CommentText>
            </CommnetFrame>
        </Wrapper>

    )
}

export default UtilFrame;
