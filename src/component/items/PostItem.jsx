import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-inline: 20px;
    padding-block: 12px;
    background-color: #FFFFFF;
    /* border-bottom: 2px solid #DFDFDF; */
`;

const PostHeader = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const TitleText = styled.p`
    font-size: 16px;
    font-weight: bold;
    color: #333333;
`;

const UserImgBox = styled.div`
    width: 20px; 
    height: 20px;
    overflow: hidden;
    position: relative;
    border-radius:10px;
    margin-block: 10px;
`;
const UserImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const UserNameText = styled.p`
    font-size: 14px;
    font-weight: bold;
    color: #333333;
`;

const DateText = styled.p`
    font-size: 12px;
    font-weight: bold;
    color: #666666;
`;

const PostImgBox = styled.div`
    width: 100%; 
    padding-bottom: 100%; /* 높이를 너비의 100%로 설정하여 정사각형 유지 */
    overflow: hidden;
    position: relative;
    border-radius:8px;
    margin-block: 10px;
`;
const PostImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const IconBox = styled.div`
    width: 100%; 
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Icon = styled.img`
    width: 24px;
    height: 24px;
    text-align: center;
`;

const DecoIcon = styled(Icon)`
    margin-left: auto;
`;

const NumbText = styled.p`
    font-size: 15px;
    font-weight: bold;
    color: #585858;
`;

function PostItem(props){
    // 
    const {post, onClick} = props;

    return (
        <Wrapper >
            <PostHeader>
                <UserImgBox>
                    <UserImg src={"/sampleImg1.png"}></UserImg>
                </UserImgBox>
                <UserNameText>김리뷰</UserNameText>
                <DateText>2024.06.24</DateText>
                <DecoIcon src={"/decoButton.png"}></DecoIcon>
            </PostHeader>
            <TitleText>분위기 좋은 곳에서 먹는 맛있는 브런치 ···</TitleText>
            <PostImgBox>
                <PostImg src={"/sampleImg1.png"}></PostImg>
            </PostImgBox>
            <IconBox>
                <Icon src={"/like.png"}></Icon>
                <NumbText>234</NumbText>
                <Icon src={"/comment.png"}></Icon>
                <NumbText>49</NumbText>
            </IconBox>
        </Wrapper>
    )
}

export default PostItem;
