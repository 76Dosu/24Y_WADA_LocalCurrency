

import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


//component
import Navigation from "../navigation/Navigation";
import Header from "../header/Header";
import LocationInfo from "../items/LocationInfo";
import FixedTop from "../header/FixedTop";


const Wrapper = styled.div`
    width: 100%;
`;

const ContentArea = styled.div`
    width: 100%;
    height: calc(100vh - 220px);
    overflow: auto;
    padding: 0 20px;
`;



const SearchBar=styled.textarea`
margin-top: 12px;
    width: 100%;
    height: 40px;
    border-radius:20px ;
    background-color: #F3F4F5;
    margin-bottom: 12px;
    resize: none;
    border: 1px solid #fff;
    line-height: 20px;
    outline: none;
 font-size: 16px;
 padding: 8px;
 overflow: hidden;
 display: block;
`

function PostSelectPage(props) {
    const navigation = useNavigate();
  return (
    
    <Wrapper>
            <FixedTop />
            <Header backLink="/" headerTitle="포스팅" />
            <ContentArea>
                <SearchBar placeholder="ckwww"></SearchBar>
                <LocationInfo  storeName="뜨끈이감자탕" 
                    address="경기도 시흥시 정왕동"
                    onClick={function() {navigation('/write', {state: ["뜨끈이감자탕","경기도 시흥시 정왕동"]})}} navTitle="리뷰 작성"
                    >
                        
                </LocationInfo>
                <LocationInfo  storeName="814바베큐" 
                    address="경기도 시흥시 배곧동"
                    onClick={function() {navigation('/write', {state: ["814바베큐","경기도 시흥시 배곧동"]})}} navTitle="리뷰 작성"
                    >
                </LocationInfo>
                <LocationInfo  storeName="속초집" 
                    address="경기도 시흥시 정왕본동"
                    onClick={function() {navigation('/write', {state: ["속초집","경기도 시흥시 정왕본동"]})}} navTitle="리뷰 작성"
                    >
                </LocationInfo>
                <LocationInfo  storeName="전라도 연탄구이" 
                    address="경기도 시흥시 정왕1동"
                    onClick={function() {navigation('/write', {state: ["전라도 연탄구이","경기도 시흥시 정왕1동"]})}} navTitle="리뷰 작성"
                    >
                </LocationInfo>
                <LocationInfo  storeName="초이노미" 
                    address="경기도 시흥시 정왕2동"
                    onClick={function() {navigation('/write', {state: ["초이노미","경기도 시흥시 정왕2동"]})}} navTitle="리뷰 작성"
                    >
                </LocationInfo>
                <LocationInfo  storeName="지은이네 순대국" 
                    address="경기도 시흥시 정왕3동"
                    onClick={function() {navigation('/write', {state: ["지은이네 순대국","경기도 시흥시 정왕3동"]})}} navTitle="리뷰 작성"
                    >
                </LocationInfo>

            </ContentArea>
            <Navigation />
        </Wrapper>
  )
}

export default PostSelectPage
