import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

//image
import posIcon from "../../images/map.png"
import timeIcon from "../../images/time.png"
import infoIcon from "../../images/info.png"

//component
import Navigation from "../navigation/Navigation";
import FixedTop from "../header/FixedTop";
import Header from "../header/Header.jsx";
import StoreUtilMenu from "../items/StoreUtilMenu";
import DividedDiv from "../ui/DividedDiv"
import StoreInfo from "../ui/StoreInfo";
import StoreList from "../list/StoreList.jsx";

//styled
const Wrapper = styled.div`
    width:100%;
;`

// store
const UtilContentArea = styled.div`
    width:100%;
    padding:0 20px;
    margin-top:52px;
`

const StoreBanner = styled.img`
    width:100%;
`

const ContentsArea = styled.div`
    width:100%;
    height:calc(100vh - 220px);
`

const StoreTItle = styled.p`
    font-size:24px;
    font-weight:600;
    color:#000;
`

const LikeContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 5px;

    margin:12px 0px 4px 0px;
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
    font-size:12px;
    color:#888;
`

const DivideLine = styled.hr`
    border:1px solid #f2f2f2;
    margin:12px 0px 18px 0px;
`

const StoreInfoArea = styled.div`
    width:100%;
    padding:30px 20px;
`

const StoreMenuArea = styled.div`
    display:flex;
    width:100%;
`


function StoreDetailPage(props) {


    const [data, setData] = useState([]);
    const { state } = useLocation();



    return (

        <Wrapper>
            <FixedTop />
            <Header backLink="/" headerTitle={state.name}></Header>

            <StoreBanner src={state.storeImage}></StoreBanner>

            <ContentsArea>
                {/* 유틸 */}
                <UtilContentArea>

                <StoreTItle>{state.name + " " + state.branchName}</StoreTItle>
                <LikeContainer>
                    <Icon src={"/LikeBlue.png"}></Icon>
                    <Numb>132</Numb>
                </LikeContainer>
                <PostingCount>23명의 포스팅</PostingCount>

                <DivideLine></DivideLine>

                <StoreUtilMenu></StoreUtilMenu>

                </UtilContentArea>

                <DividedDiv></DividedDiv>

                {/* 가게정보 */}
                <StoreInfoArea>
                <StoreInfo src={posIcon} content="경기 시흥시 중심상가1길 18 주차타워"></StoreInfo>
                <StoreInfo src={timeIcon} content="월 09:00 ~ 익일 1:00"></StoreInfo>
                <StoreInfo src={infoIcon} content="예약가능, 주차가능"></StoreInfo>
                </StoreInfoArea>

                <DividedDiv></DividedDiv>

                {/* 음식 메뉴 */}
                {state.menus[0].menuName !== "" &&  // 가맹점에 메뉴가 없을때
                <StoreMenuArea>
                    <StoreList menus={state.menus}></StoreList>

                </StoreMenuArea>
                }
            </ContentsArea>
            
            <Navigation></Navigation>
        </Wrapper>

    )

}

export default StoreDetailPage;