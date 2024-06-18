import React, { useState, useEffect } from 'react';
import styled from "styled-components";


//component
import Navigation from "../navigation/Navigation";
import Header from "../header/Header";
import FixedTop from "../header/FixedTop";
import Button from "../ui/Button";
import MyStoreGrid from "../list/MyStoreGrid";
import Tabs from "../tab/Tabs";

import { db } from "../../firebase.js"    // firebase 설정 가져오기

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
        transition: transform 0.2s;
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

    const myPageTab = ['즐겨찾는', '최근방문한'];

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let tempData = [];
            let collectionName = "dummyData2"

            // Get the top-level collection 'dummyData1'
            const snapshot = await db.collection(collectionName).get();

            // Iterate through each document in 'dummyData1'
            for (const doc of snapshot.docs) {
                let docData = { id: doc.id, ...doc.data() };

                // Get 'store' subcollection for each document
                const storeSnapshot = await db.collection(collectionName).doc(doc.id).collection('store').get();
                let stores = [];

                // Iterate through each document in 'store' subcollection
                for (const storeDoc of storeSnapshot.docs) {
                    let storeData = { id: storeDoc.id, ...storeDoc.data() };

                    // Get 'menu' subcollection for each 'store' document
                    const menuSnapshot = await db.collection(collectionName).doc(doc.id)
                        .collection('store').doc(storeDoc.id).collection('menu').get();
                    let menus = [];

                    // Iterate through each document in 'menu' subcollection
                    for (const menuDoc of menuSnapshot.docs) {
                        menus.push({ id: menuDoc.id, ...menuDoc.data() });
                    }
                    storeData.menus = menus;

                    // Get 'post' subcollection for each 'store' document
                    const postSnapshot = await db.collection(collectionName).doc(doc.id)
                        .collection('store').doc(storeDoc.id).collection('post').get();
                    let posts = [];

                    // Iterate through each document in 'post' subcollection
                    for (const postDoc of postSnapshot.docs) {
                        posts.push({ id: postDoc.id, ...postDoc.data() });
                    }
                    storeData.posts = posts;

                    stores.push(storeData);
                }

                docData.stores = stores;
                tempData.push(docData);
            }

            setData(tempData);
        };

        fetchData();
    }, []);


    return (

        <Wrapper>
            <FixedTop></FixedTop>
            <Header backLink="/" headerTitle="나의 가맹점"></Header>
            

            <Tabs data={data} minWidthPer={50} tabType={'나의가맹점'} tabList={myPageTab} nowState={0}></Tabs>
            <Navigation></Navigation>
        </Wrapper>
    
    )

}

export default MyStorePage;