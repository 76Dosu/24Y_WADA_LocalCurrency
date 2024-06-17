import React, { useState } from 'react';
import styled from "styled-components";


//component
import Navigation from "../navigation/Navigation";
import Header from "../header/Header";
import FixedTop from "../header/FixedTop";
import Button from "../ui/Button";
import MyStoreGrid from "../list/MyStoreGrid";
import { useLocation } from 'react-router-dom';
import Tabs from '../tab/Tabs';

//styled
const Wrapper = styled.div`
    width: 100%;
`;

const ContentArea = styled.div`
    width: 100%;
    height: calc(100vh - 280px);
    overflow: hidden;
    position: relative;
`;

const TempTabContainer = styled.div`
    display: flex;
    height: 60px;
    border-bottom: 1px solid #E6E6E6;
    overflow-x: auto;
    white-space: nowrap;
`;



const TabContentContainer = styled.div`
    display: flex;
    transition: transform 0.5s ease;
    transform: ${props => `translateX(-${props.activeTab * 100}%)`};
`;

const TabContent = styled.div`
    min-width: 100%;
    height: 100%;
`;


function CategoryPage(props) {

    // const [activeTab, setActiveTab] = useState(1);
    const {state} = useLocation();


    
    const myStoreList = ['뜨끈이감자탕', '생금마을', '카페39'];
    const recentStoreList = ['27%', '함돈'];

    const categoryLabel = ['한식', '중식', '일식', '양식', '패스트푸드', 
    '카페', '베이커리', '편의점/마트', '의료/보건', '미용/뷰티', 
    '학원/교육', '스포츠/헬스', '숙박업', '기타', '인테리어',
    '도서/문화', '의류/안경', '주유소', '산모/육아', '가전/통신',
    '시장/거리', '자동차/자전거', '부동산', '평생학습기관', '여성생필품'];



    return (

        <Wrapper>
            <FixedTop></FixedTop>
            <Header backLink="/" headerTitle="가맹점 찾기"></Header>
            

            <Tabs tabType={'카테고리'} tabList={categoryLabel} nowState={state}></Tabs>
            <Navigation></Navigation>
        </Wrapper>
    
    )

}

export default CategoryPage;