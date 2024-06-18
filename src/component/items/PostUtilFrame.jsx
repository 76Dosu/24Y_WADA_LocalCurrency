// PostUtilFrame.jsx 파일
import React, { useState } from "react";
import styled from "styled-components";

// 이미지
import likeIcon from "../../images/like.png";
import likeIconActive from "../../images/likeF_active.png";
import commentIcon from "../../images/comment.png";

// styled components
const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 16px;
    gap: 16px;
`;

const LikeFrame = styled.div`
    width: fit-content;
    display: flex;
    align-items: center;
`;

const LikeIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 8px;
`;

const LikeText = styled.p`
    font-size: 16px;
`;

const CommnetFrame = styled.div`
    width: fit-content;
    display: flex;
    align-items: center;
`;

const CommentIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 8px;
`;

const CommentText = styled.p`
    font-size: 16px;
`;

function UtilFrame({ likes, comments }) {
    const [isLikeActive, setIsLikeActive] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);

    const handleLikeClick = () => {
        setIsLikeActive(!isLikeActive);
        setLikeCount(isLikeActive ? likeCount - 1 : likeCount + 1);
    };

    return (
        <Wrapper>
            <LikeFrame>
                <LikeIcon onClick={handleLikeClick} src={isLikeActive ? likeIconActive : likeIcon}></LikeIcon>
                {isLikeActive === false && <LikeText>35</LikeText>}
                {isLikeActive == true && <LikeText>36</LikeText>}
            </LikeFrame>
            <CommnetFrame>
                <CommentIcon src={commentIcon}></CommentIcon>
                <CommentText>{comments}</CommentText>
            </CommnetFrame>
        </Wrapper>
    );
}

export default UtilFrame;
