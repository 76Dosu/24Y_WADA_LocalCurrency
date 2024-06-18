import React from "react";
import styled from "styled-components";
// import CommentItem from "../page/CommentItem";

// image
import likeIcon from "../../images/like.png"

const Wrapper = styled.div`
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

function CommentList(props) {
    
    const { comments, onClick } = props;

    return (
        <Wrapper>
            <CommentUserInfo>
                <UserImage src={"/profileSample1.png"}></UserImage>
                <UserTextInfo>
                    <UserName>티노사랑</UserName>
                    <UserWriteTime>1주전</UserWriteTime>
                </UserTextInfo>

                <BalanceUtilFrame>
                    <UtilSpan></UtilSpan>
                    <UtilSpan></UtilSpan>
                    <UtilSpan></UtilSpan>
                </BalanceUtilFrame>
            </CommentUserInfo>

            <CommentFrame>
                <CommentContents>미쳤습니다.</CommentContents>
                <LikeButton src={likeIcon}></LikeButton>
            </CommentFrame>
            {/* {comments && comments.map((comment, index) => {

                return (
                    <CommentItem key={comment.id} comment={comment}></CommentItem>
                )

            })} */}
        </Wrapper>
    )

}

export default CommentList;