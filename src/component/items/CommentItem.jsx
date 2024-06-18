import React from "react";
import styled from "styled-components";

// image
import likeIcon from "../../images/like.png"

const Wrapper = styled.div`
    width:100%;
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding:12px 0px 8px 0px;
    margin-bottom:12px;
`

const CommentUserInfo = styled.div`
    width:100%;
    display:flex;
    align-items:center;
`

const UserImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius:40px;
`

const UserTextInfo = styled.div`
    width:fit-content;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    margin-left:12px;
`

const BalanceUtilFrame = styled.div`
    width:fit-content;
    display:flex;
    margin-left:auto;

    cursor:pointer;
`

const UtilSpan = styled.div`
    width:4px;
    height:4px;
    background-color:#000;
    border-radius:10px;
    margin-left:4px;

    &:last-child {
        margin-bottom:0px;
    }
`

const UserName = styled.p`
    font-size:16px;
    font-weight:bold;
`
const UserWriteTime = styled.p`
    font-size:14px;
    color:#888;
`

const CommentFrame = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin-top:12px;
`

const CommentContents = styled.p`
    font-size:16px;
    color:#333;
    width:calc(100% - 40px);
`

const LikeButton = styled.img`
    width: 24px;
    height: 24px;
`

function CommentItem(props) {
    
    const { comment, postInfo } = props;

    return (
        <Wrapper>
            <CommentUserInfo>
                <UserImage src={"/profileSample1.png"}></UserImage>
                <UserTextInfo>
                    <UserName>티노사랑</UserName>
                    <UserWriteTime>{postInfo.year}년 {postInfo.month}월 {postInfo.day}일</UserWriteTime>
                    
                </UserTextInfo>

                <BalanceUtilFrame>
                    <UtilSpan></UtilSpan>
                    <UtilSpan></UtilSpan>
                    <UtilSpan></UtilSpan>
                </BalanceUtilFrame>
            </CommentUserInfo>

            <CommentFrame>
                <CommentContents>{comment.content}</CommentContents>
                <LikeButton src={likeIcon}></LikeButton>
            </CommentFrame>
        </Wrapper>
    )

}

export default CommentItem;