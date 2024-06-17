import React, { useState, useEffect } from 'react';
import styled from "styled-components";


//component
import Navigation from "../navigation/Navigation";
import Header from "../header/Header";
import FixedTop from "../header/FixedTop";
import Button from "../ui/Button";
import MyStoreGrid from "../list/MyStoreGrid";
import { useLocation } from 'react-router-dom';
import Tabs from '../tab/Tabs';

import { db } from "../../firebase.js"    // firebase 설정 가져오기

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
    '카페', '베이커리', '편의점/마트', '의료/보건', 
    '학원/교육', '스포츠/헬스', '도서/문화', '자동차', '부동산', '평생학습기관'];


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
            <Header backLink="/" headerTitle="가맹점 찾기"></Header>
            

            <Tabs data={data} tabType={'카테고리'} tabList={categoryLabel} nowState={state}></Tabs>
            <Navigation></Navigation>
        </Wrapper>
    
    )

}

export default CategoryPage;