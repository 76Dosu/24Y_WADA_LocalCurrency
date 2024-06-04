import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//component
import Navigation from "../navigation/Navigation";
import Header from "../header/Header";
import FixedTop from "../header/FixedTop";
import Button from "../ui/Button";
import PostItem from "../items/PostItem";

//styled
const Wrapper = styled.div`
    width:100%;
`
const ContentArea = styled.div`
    width:100%;
    height: calc(100vh - 220px);
    overflow: auto;
`

const ProfileHeader = styled.div`
    width:100%;
    margin:0;
`
const BackImgBox = styled.div`
    width: 100%; 
    padding-bottom: 40%;
    overflow: hidden;
    position: relative;
`;

const BackImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const UserImgBox = styled.div`
    width: 80px; 
    height: 80px;
    overflow: hidden;
    position: relative;
    border: 5px solid #FFFFFF;
    border-radius:40px;
    transform: translate(0, -50%);
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
const UserInfo = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transform: translate(0, -50%);
`;
const UserName = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: #171725;
    margin-bottom:10px;
`;
const UserState = styled.p`
    font-size: 12px;
    color: #828282;
`;
const Stats = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 60px;
`;
const StatCover = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const StatNumb = styled.p`
    font-size: 16px;
    font-weight: bold;
    color: #1C170D;
`;
const StatText = styled.p`
    font-size: 14px;
    font-weight: bold;
    color: #585858;
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding:20px;
`;

const MyPostContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #F2F2F2;
    border-top: 2px solid #DFDFDF;
    padding-top: 10px;

`;
const TitleCover = styled.div`
    display: flex;
    background-color: #FFFFFF;
    padding: 20px 20px 0 20px;
    padding-inline: 20px;
    align-items: center;
`;
const MyPostContainerTitle = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: #333333;
`;
const MyPostContainerNumber = styled.p`
    float:bottom;
    margin: 5px 0 0 10px;
    font-size: 12px;
    color: #BCBBBA;
`;
function MyPage(props) {
    
    const navigation = useNavigate();

    return (

        <Wrapper>
            <FixedTop></FixedTop>
            <Header backLink="/" headerTitle="마이페이지"></Header>
            <ContentArea>
                <ProfileHeader>
                    <BackImgBox>
                        <BackImg src={"/backSample1.png"}></BackImg>
                    </BackImgBox>
                    <StatCover>
                        <UserImgBox>
                            <UserImg src={"/profileSample1.png"}></UserImg>
                        </UserImgBox>
                        <UserInfo>
                            <UserName>석상현</UserName>
                            <UserState>외로운 시흥살이 맛있는거 먹자</UserState>
                        </UserInfo>
                        
                    </StatCover>

                    <Stats>
                        <StatCover>
                            <StatNumb>12</StatNumb>
                            <StatText>팔로잉</StatText>
                        </StatCover>
                        <StatCover>
                            <StatNumb>5</StatNumb>
                            <StatText>팔로워</StatText>
                        </StatCover>
                        <StatCover>
                            <StatNumb>21</StatNumb>
                            <StatText>포스팅</StatText>
                        </StatCover>
                    </Stats>
                </ProfileHeader>
                <ButtonContainer>
                    <Button width={"45%"} title={"프로필 편집"}></Button>
                    <Button width={"45%"} background={"#FFFFFF"} color={"#3182F7"} title={"나의 가맹점"} onClick={() => {navigation('/myStore')}}></Button>
                </ButtonContainer>
                <MyPostContainer>
                    <TitleCover>
                        <MyPostContainerTitle>내 포스트</MyPostContainerTitle>
                        <MyPostContainerNumber>21개</MyPostContainerNumber>
                    </TitleCover>
                    <PostItem></PostItem>
                    <PostItem></PostItem>
                    <PostItem></PostItem>
                </MyPostContainer>
            </ContentArea>
            
            <Navigation></Navigation>
            
        </Wrapper>
    
    )

}

export default MyPage;