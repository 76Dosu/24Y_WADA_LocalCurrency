import React from "react";
import styled from "styled-components";


//component
import Navigation from "../navigation/Navigation";
import Header from "../header/Header";
import FixedTop from "../header/FixedTop";
import Button from "../ui/Button";
import MyStoreGrid from "../list/MyStoreGrid";

//styled
const Wrapper = styled.div`
    width:100%;
`
const ContentArea = styled.div`
    width:100%;
    height: calc(100vh - 280px);
    overflow: auto;
`

const TempTabContainer = styled.div`
    display: flex;
    height: 60px;
    border-bottom: 1px solid #E6E6E6;
`
const TempTab = styled.div`
    display: flex;
    align-items:center;
    justify-content: center;
    width:50%;
    border-bottom: 5px solid #3182F7;
`
const TempUnTab = styled.div`
    display: flex;
    align-items:center;
    justify-content: center;
    width:50%;
`
const TempTabText = styled.p`
    font-size: 14px;
    font-weight: bold;
    color: #1C170D;
`
const TempUnTabText = styled.p`
    font-size: 14px;
    font-weight: bold;
    color: #585858;
`
function MyStorePage(props) {

    return (

        <Wrapper>
            <FixedTop></FixedTop>
            <Header backLink="/" headerTitle="나의 가맹점"></Header>
            <TempTabContainer>
                <TempTab>
                    <TempTabText>즐겨찾는</TempTabText>
                </TempTab>
                <TempUnTab>
                    <TempUnTabText>최근방문한</TempUnTabText>
                </TempUnTab>
            </TempTabContainer>
            <ContentArea>
                <MyStoreGrid></MyStoreGrid>
            </ContentArea>
            <Navigation></Navigation>
        </Wrapper>
    
    )

}

export default MyStorePage;