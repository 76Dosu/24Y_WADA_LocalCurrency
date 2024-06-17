import React, {useState} from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;

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
    padding-bottom: ${props => props.height}%; /* 높이를 너비의 100%로 설정하여 정사각형 유지 */
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

function StoreItem(props){
    // 
    const {listType, heightRatio ,store, data, onClick} = props;
    const [bookMark, setBookmark] = useState('off');

    return (
        <Wrapper >
            <PostImgBox height={heightRatio || 80}>
                <PostImg src={data.storeImage+".png"}></PostImg>
            </PostImgBox>
            {listType === '카테고리' && (
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
                        {bookMark==='on' && (
                            <LastIcon onClick={() => setBookmark('off')} src={"/StarOn.png"}></LastIcon>
                        )}
                        {bookMark==='off' && (
                            <LastIcon onClick={() => setBookmark('on')} src={"/StarOff.png"}></LastIcon>
                        )}
                    </StateContainer>
                </ContentContainer>
            )}
            {listType === '나의가맹점' && (
                <ContentContainer>
                    <NameText>{data.name || "가맹점 이름"}</NameText>
                    <SecondNameText>{data.branchName}</SecondNameText>
                    <DateText>7일전 방문</DateText>
                </ContentContainer>
            )}
            {listType === '메뉴' && (
                <ContentContainer>
                    <NameText>{store || "메뉴 이름"}</NameText>
                    <SecondNameText>9,000 원</SecondNameText>
                </ContentContainer>
            )}

            
        </Wrapper>
    )
}

export default StoreItem;
