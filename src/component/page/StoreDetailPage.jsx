import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

// 이미지
import posIcon from "../../images/map.png";
import timeIcon from "../../images/time.png";
import infoIcon from "../../images/info.png";

// 컴포넌트
import Navigation from "../navigation/Navigation";
import FixedTop from "../header/FixedTop";
import Header from "../header/Header.jsx";
import StoreUtilMenu from "../items/StoreUtilMenu";
import DividedDiv from "../ui/DividedDiv";
import StoreInfo from "../ui/StoreInfo";
import StoreList from "../list/StoreList.jsx";
import PostList from "../list/PostList";

// 스타일드 컴포넌트
const Wrapper = styled.div`
    width: 100%;
    overflow: scroll;
    height: calc(100vh - 103px - 114px);
    margin-top: 103px;
`;

const UtilContentArea = styled.div`
    width: 100%;
    padding: 0 20px;
    margin-top: 52px;
`;

const StoreBanner = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const ContentsArea = styled.div`
    width: 100%;
    overflow: hidden;
`;

const StoreTitle = styled.p`
    font-size: 24px;
    font-weight: 600;
    color: #000;
`;

const LikeContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 12px 0px 4px 0px;
`;

const Icon = styled.img`
    width: 16px;
    height: 16px;
    text-align: center;
`;

const Numb = styled.p`
    font-size: 14px;
    color: #66707A;
`;

const PostingCount = styled.p`
    font-size: 12px;
    color: #888;
`;

const DivideLine = styled.hr`
    border: 1px solid #f2f2f2;
    margin: 12px 0px 18px 0px;
`;

const StoreInfoArea = styled.div`
    width: 100%;
    padding: 30px 20px;
`;

const StoreMenuArea = styled.div`
    display: flex;
    width: 100%;
`;

const StoreMenuArea2 = styled.div`
    width: 100%;
    overflow-x: auto;
    padding: 0px 20px;
    margin: 20px 0px 36px 0px;
`;

const StoreImgWrap = styled.div`
    width: 100%;
    height: 260px;
    position: relative;
`;

const StoreProfile = styled.img`
    width: 80px;
    height: 80px;
    object-fit: cover;
    border: 5px solid #ffffff;
    position: absolute;
    left: 20px;
    bottom: 0;
    transform: translateY(50%);
    border-radius: 40px;
`;



const PostContainer = styled.div`
    width:100%;
`

function StoreDetailPage(props) {
    const [data, setData] = useState([]);
    const { state } = useLocation();
    const navigate = useNavigate();
    const [likeCount, setLikeCount] = useState(132);

    const handleLikeClick = (isLiked) => {
        setLikeCount(likeCount + (isLiked ? -1 : 1));
    };

    return (
        <Wrapper>
            <FixedTop />
            <Header backLink="/category" headerTitle={state.name}></Header>
            <StoreImgWrap>
                <StoreBanner src={state.storeImage}></StoreBanner>
                <StoreProfile src={state.storeImage}></StoreProfile>
            </StoreImgWrap>

            <ContentsArea>
                <UtilContentArea>
                    <StoreTitle>{state.name + " " + state.branchName}</StoreTitle>
                    <LikeContainer>
                        <Icon src={"/LikeBlue.png"}></Icon>
                        <Numb>{likeCount}</Numb>
                    </LikeContainer>
                    <PostingCount>23명의 포스팅</PostingCount>
                    <DivideLine></DivideLine>
                    <StoreUtilMenu onLikeClick={handleLikeClick}></StoreUtilMenu>
                </UtilContentArea>

                <DividedDiv></DividedDiv>

                <StoreInfoArea>
                    <StoreInfo src={posIcon} content="경기 시흥시 중심상가1길 18 주차타워"></StoreInfo>
                    <StoreInfo src={timeIcon} content="월 09:00 ~ 익일 1:00"></StoreInfo>
                    <StoreInfo src={infoIcon} content="예약가능, 주차가능"></StoreInfo>
                </StoreInfoArea>

                <DividedDiv></DividedDiv>

                {state.menus[0].menuName !== "" && (
                    <StoreMenuArea2>
                        <StoreMenuArea>
                            <StoreList menus={state.menus}></StoreList>
                        </StoreMenuArea>
                    </StoreMenuArea2>

                )}
                {console.log("state==================================================")}
                {console.log(state.posts)}
                <PostContainer>
                    <PostList storePosts={state.posts} onClickItem={(p) => { navigate('/post/' + p.id, { state: p }) }} />
                </PostContainer>

            </ContentsArea>

            <Navigation></Navigation>
        </Wrapper>
    );
}

export default StoreDetailPage;
