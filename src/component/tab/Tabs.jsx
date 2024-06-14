import React, { useState } from 'react';
import styled from "styled-components";


//component
import Navigation from "../navigation/Navigation";
import Header from "../header/Header";
import FixedTop from "../header/FixedTop";
import Button from "../ui/Button";
import MyStoreGrid from "../list/MyStoreGrid";
import { useLocation } from 'react-router-dom';
import TempStoreItem from '../items/TempStoreItem';
import MyStoreItem from '../items/MyStoreItem';

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

const TabButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: ${props => (props.min_width_per)}%;
    padding: 0 20px;
    font-size: 14px;
    font-weight: bold;
    color: ${props => (props.active ? '#1C170D' : '#585858')};
    position: relative;
    cursor: pointer;
    transition: color 0.3s;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 5px;
        background-color: #3182F7;
        transition: transform 0.3s, opacity 0.3s;
        opacity: ${props => (props.active ? '1' : '0')};
        transform: ${props => (props.active ? 'scaleX(1)' : 'scaleX(0)')};
        transform-origin: bottom left;
    }
`;

const TabContentContainer = styled.div`
    display: flex;
    transition: transform 0.5s ease;
    transform: ${props => `translateX(-${props.activeTab * 100}%)`};
`;

const TabContent = styled.div`
    min-width: 100%;
    height: calc(100vh - 280px);
    overflow: auto;
`;


function Tabs(props) {
    const {minWidthPer, tabType, tabList} =props;
    // const [activeTab, setActiveTab] = useState(1);
    const {state} = useLocation();

    
    
    const myStoreList = ['뜨끈이감자탕', '생금마을', '카페39','뜨끈이감자탕', '생금마을', '카페39'];
    const recentStoreList = ['27%', '함돈'];

    const [activeTab, setActiveTab] = useState(0);

    const contents = tabList.map((tab, i) => (
        <TabContent key={i}>
            {tabType === '카테고리' && (
                <Wrapper>
                    <TempStoreItem heightRatio={50} listType={'카테고리'}></TempStoreItem>
                    <TempStoreItem heightRatio={50} listType={'카테고리'}></TempStoreItem>
                    <TempStoreItem heightRatio={50} listType={'카테고리'}></TempStoreItem>
                    <TempStoreItem heightRatio={50} listType={'카테고리'}></TempStoreItem>
                </Wrapper>
                
            )}
            {tabType === '나의가맹점' && (
                <MyStoreGrid stores={myStoreList}></MyStoreGrid>
            )}
        </TabContent>
    ));


    return (

        <Wrapper>
            

            <TempTabContainer>
                {tabList.map((tab, index) => (
                    <TabButton
                        key={index}
                        min_width_per = {minWidthPer || 25}
                        active={activeTab === index}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab}
                    </TabButton>
                ))}
            </TempTabContainer>

            <ContentArea>
                <TabContentContainer activeTab={activeTab}>
                    {contents}
                </TabContentContainer>
            </ContentArea>
        </Wrapper>
    
    )

}

export default Tabs;