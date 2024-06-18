import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


//component
import Navigation from "../navigation/Navigation";
import Header from "../header/Header";
import LocationInfo from "../items/LocationInfo";
import FixedTop from "../header/FixedTop";
import TextInput from "../ui/TextInput";

//images
import searchIcon from "../../images/searchIcon.png"

const Wrapper = styled.div`
    width: 100%;
    height: calc(100vh - 103px - 114px);
    margin:103px 0 114px 0px;
`;

const ContentArea = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 0 20px;
`;

const TextInputWrapper = styled.div`
    width:100%;
    margin:12px 0px 16px 0px;
`

function PostSelectPage(props) {
    const navigation = useNavigate();
  return (
    
    <Wrapper>
            <FixedTop />
            <Header backLink="/" headerTitle="포스팅" />
            <ContentArea>
                <TextInputWrapper>
                    <TextInput placeholder="카테고리 또는 가맹점 입력" icon={searchIcon} />
                </TextInputWrapper>
                <LocationInfo  storeName="뜨끈이 감자탕" 
                    address="경기도 시흥시 정왕동"
                    onClick={function() {navigation('/write', {state: ["뜨끈이 감자탕","경기도 시흥시 정왕동"]})}} navTitle="리뷰 작성"
                    >
                        
                </LocationInfo>
                <LocationInfo  storeName="더베이징" 
                    address="경기도 시흥시 배곧동"
                    onClick={function() {navigation('/write', {state: ["더베이징","경기도 시흥시 배곧동"]})}} navTitle="리뷰 작성"
                    >
                </LocationInfo>
                <LocationInfo  storeName="스미카츠" 
                    address="경기도 시흥시 정왕본동"
                    onClick={function() {navigation('/write', {state: ["스미카츠","경기도 시흥시 정왕본동"]})}} navTitle="리뷰 작성"
                    >
                </LocationInfo>
                <LocationInfo  storeName="포레스트" 
                    address="경기도 시흥시 정왕1동"
                    onClick={function() {navigation('/write', {state: ["포레스트","경기도 시흥시 정왕1동"]})}} navTitle="리뷰 작성"
                    >
                </LocationInfo>
                <LocationInfo  storeName="맘스터치" 
                    address="경기도 시흥시 정왕2동"
                    onClick={function() {navigation('/write', {state: ["맘스터치","경기도 시흥시 정왕2동"]})}} navTitle="리뷰 작성"
                    >
                </LocationInfo>
                <LocationInfo  storeName="카페더피치" 
                    address="경기도 시흥시 정왕3동"
                    onClick={function() {navigation('/write', {state: ["카페더피치","경기도 시흥시 정왕3동"]})}} navTitle="리뷰 작성"
                    >
                </LocationInfo>
                <LocationInfo  storeName="쁘숑베이커리" 
                    address="경기도 시흥시 정왕3동"
                    onClick={function() {navigation('/write', {state: ["쁘숑베이커리","경기도 시흥시 정왕3동"]})}} navTitle="리뷰 작성"
                    >
                </LocationInfo>

            </ContentArea>
            <Navigation />
        </Wrapper>
  )
}

export default PostSelectPage
