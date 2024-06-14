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

    console.log(state)

    
    const myStoreList = ['뜨끈이감자탕', '생금마을', '카페39'];
    const recentStoreList = ['27%', '함돈'];

    const [activeTab, setActiveTab] = useState(0);

    const contents = state.map((tab, i) => (
        <TabContent key={i}>
            <MyStoreGrid stores={myStoreList}></MyStoreGrid>
        </TabContent>
    ));


    return (

        <Wrapper>
            <FixedTop></FixedTop>
            <Header backLink="/" headerTitle="나의 가맹점"></Header>
            

            <Tabs tabType={'카테고리'} tabList={state}></Tabs>
            <Navigation></Navigation>
        </Wrapper>
    
    )

}

export default CategoryPage;