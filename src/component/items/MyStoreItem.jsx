import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    height:250px;

    margin-bottom: 8px;
    background-color: #FFFFFF;
    border-radius: 12px;

    display: flex;
    flex-direction: column;
`;
const ContentContainer = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    border-right: 2px solid #EEEEEE;
    border-bottom: 2px solid #EEEEEE;
    border-left: 2px solid #EEEEEE;
    border-radius: 0 0 12px 12px;
`;

const StoreName = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: #333333;
    margin-bottom:3px;
`;

const StoreSecondName = styled.p`
    font-size: 12px;
    color: #666666;
    margin-bottom:15px;
`;

const DateText = styled.p`
    font-size: 12px;
    color: #666666;
`;

const PostImgBox = styled.div`
    width: 100%; 
    padding-bottom: 90%; /* 높이를 너비의 100%로 설정하여 정사각형 유지 */
    overflow: hidden;
    position: relative;
    border-radius: 12px 12px 0 0;
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



function MyStoreItem(props){
    // 
    const {store, onClick} = props;

    return (
        <Wrapper >
            <PostImgBox>
                <PostImg src={"/foodsample1.png"}></PostImg>
            </PostImgBox>
            <ContentContainer>
                <StoreName>{store || "뜨끈이 감자탕"}</StoreName>
                <StoreSecondName>시화이마트점</StoreSecondName>
                <DateText>7일전 방문</DateText>
            </ContentContainer>

            
        </Wrapper>
    )
}

export default MyStoreItem;
