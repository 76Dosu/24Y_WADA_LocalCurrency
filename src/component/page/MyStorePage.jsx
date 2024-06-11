import React, { useState } from 'react';
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




const TabButton = styled.div`
    display: flex;
    align-items:center;
    justify-content: center;
    width:50%;
    
    font-size: 14px;
    font-weight: bold;
    color: ${props => (props.active ? '#1C170D' : '#585858')};
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        bottom: 0px;
        left: 0;
        width: 100%;
        height: 5px;
        background-color: #3182F7;
        transition: transform 0.5s;
        transform: ${props => (props.active ? 'translateX(0)' : 'translateX(100%)')};
    }

`;

const TabButtonTwo = styled.div`
    display: flex;
    align-items:center;
    justify-content: center;
    width:50%;
    font-size: 14px;
    font-weight: bold;
    color: ${props => (props.active ? '#1C170D' : '#585858')};
    position: relative;
`

const List = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const ListItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

function MyStorePage(props) {

    const [activeTab, setActiveTab] = useState(1);


    
    const myStoreList = ['뜨끈이감자탕', '생금마을', '카페39'];
    const recentStoreList = ['27%', '함돈'];


    return (

        <Wrapper>
            <FixedTop></FixedTop>
            <Header backLink="/" headerTitle="나의 가맹점"></Header>
            

            <TempTabContainer>
                <TabButton active={activeTab === 1} onClick={() => setActiveTab(1)}>
                    즐겨찾는
                </TabButton>
                <TabButtonTwo active={activeTab === 2} onClick={() => setActiveTab(2)}>
                    최근방문한
                </TabButtonTwo>
                
            </TempTabContainer>
                
            <ContentArea>
                {activeTab === 1 && (
                    <MyStoreGrid stores={myStoreList}></MyStoreGrid>
                )}
                {activeTab === 2 && (
                    <MyStoreGrid stores={recentStoreList}></MyStoreGrid>
                )}
                
            </ContentArea>
            <Navigation></Navigation>
        </Wrapper>
    
    )

}

export default MyStorePage;