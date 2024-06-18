import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    min-height:200px;

    margin-bottom: 16px;
    background-color: #FFFFFF;
    border-radius: 12px;

    display: flex;
    flex-direction: column;
`;
const MenuWrapper = styled(Wrapper)`
    min-width: 160px;
    min-height:200px;
    width:160px;

    padding-right:20px;

    background-color: #FFFFFF;
    border-radius: 12px;

    display: flex;
    flex-direction: column; 
`

const ContentContainer = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    border-right: 2px solid #EEEEEE;
    border-bottom: 2px solid #EEEEEE;
    border-left: 2px solid #EEEEEE;
    border-radius: 0 0 12px 12px;
`;

const NameText = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: #333333;
    margin-bottom:3px;
`;

const SecondNameText = styled.p`
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
    padding-bottom: ${props => props.height}%;
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

const Numb = styled.p`
    font-size: 14px;
    color: #66707A;
`;
const Bar = styled.p`
    font-size: 12px;
    color: #E8F2FB;
`;

const UserImgBox = styled.div`
    width: 20px; 
    height: 20px;
    overflow: hidden;
    position: relative;
    border-radius:10px;
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

const StateContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 5px;
`;

const Icon = styled.img`
    width: 16px;
    height: 16px;
    text-align: center;
`;

const LastIcon = styled(Icon)`
    margin-left: auto;
`;

function StoreItem(props) {

    const { listType, heightRatio, store, data, onClickItem } = props;
    const [bookMark, setBookmark] = useState('off');

    const navigate = useNavigate()

    return (

        //우선은 클릭 시 가맹점 상세페이지로 이동
        //나중에 파이어베이스 연결해줘서 맞춰야할 듯
        <>
            {listType === '카테고리' && (
                <Wrapper onClick={() => onClickItem(data)}>
                    <PostImgBox height={heightRatio || 80}>
                        <PostImg src={data.storeImage + ".png"}></PostImg>
                    </PostImgBox>
                    <ContentContainer>
                        <NameText>{data.name || "가맹점이름"}</NameText>
                        <StateContainer>
                            <SecondNameText>{data.branchName}</SecondNameText>
                            <SecondNameText>768 m</SecondNameText>
                        </StateContainer>
                        <StateContainer>
                            <Icon src={"/LikeBlue.png"}></Icon>
                            <Numb>132</Numb>

                            <Bar>|</Bar>
                            <UserImgBox>
                                <UserImg src={"/sampleImg1.png"}></UserImg>
                            </UserImgBox>
                            <UserImgBox>
                                <UserImg src={"/sampleImg1.png"}></UserImg>
                            </UserImgBox>
                            <UserImgBox>
                                <UserImg src={"/sampleImg1.png"}></UserImg>
                            </UserImgBox>
                            <Numb>+2</Numb>
                            {bookMark === 'on' && (
                                <LastIcon onClick={() => setBookmark('off')} src={"/StarOn.png"}></LastIcon>
                            )}
                            {bookMark === 'off' && (
                                <LastIcon onClick={() => setBookmark('on')} src={"/StarOff.png"}></LastIcon>
                            )}
                        </StateContainer>
                    </ContentContainer>
                </Wrapper>

            )}
            {listType === '나의가맹점' && (
                <Wrapper onClick={onClickItem}>
                    <PostImgBox height={heightRatio || 80}>
                        <PostImg src={data.storeImage + ".png"}></PostImg>
                    </PostImgBox>
                    <ContentContainer>
                        <NameText>{data.name || "가맹점 이름"}</NameText>
                        <SecondNameText>{data.branchName}</SecondNameText>
                        <DateText>7일전 방문</DateText>
                    </ContentContainer>
                </Wrapper>
            )}
            {listType === '메뉴' && (
                <MenuWrapper>
                    <PostImgBox height={heightRatio || 0}>
                        <PostImg src={data.menuImage + ".png"}></PostImg>
                    </PostImgBox>
                    <ContentContainer>
                        <NameText>{data.menuName || "메뉴 이름"}</NameText>
                        <SecondNameText>{data.menuPrice}</SecondNameText>
                    </ContentContainer>
                </MenuWrapper>
            )}


        </>
    )
}

export default StoreItem;
