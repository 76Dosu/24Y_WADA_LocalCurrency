import React, { useState, useEffect } from 'react';
import styled from "styled-components";


//component
import Navigation from "../navigation/Navigation";
import Header from "../header/Header";
import FixedTop from "../header/FixedTop";
import { useLocation } from 'react-router-dom';
import Tabs from '../tab/Tabs';

import { db } from "../../firebase.js"    // firebase 설정 가져오기

//styled
const Wrapper = styled.div`
    width: 100%;
    height:calc(100vh - 103px - 114px);
    margin:103px 0 114px 0px;
`

const ContentArea = styled.div`
    width: 100%;
    height: 100%;
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
    overflow:hidden;
`;

const TabContent = styled.div`
    min-width: 100%;
    height: 100%;
`;


function CategoryPage(props) {

    // const [activeTab, setActiveTab] = useState(1);
    const {state} = useLocation();

    // const myStoreList = ['뜨끈이감자탕', '생금마을', '카페39'];
    // const recentStoreList = ['27%', '함돈'];

    const categoryLabel = ['한식', '중식', '일식', '양식', '패스트푸드', 
    '카페', '베이커리', '편의점/마트', '의료/보건', 
    '학원/교육', '스포츠/헬스', '도서/문화', '자동차', '부동산', '평생학습기관'];
    
    const [data, setData] = useState([]);

 

    useEffect(() => {
        console.log("start");
        const fetchData = async () => {
          let tempData = [];
          const collectionName = "dummyData2";
    
          try {
            // Get the top-level collection 'dummyData2'
            const snapshot = await db.collection(collectionName).get();
    
            // Process each document in 'dummyData2'
            const promises = snapshot.docs.map(async doc => {
              let docData = { id: doc.id, ...doc.data() };
    
              // Get 'store' subcollection for each document
              const storeSnapshot = await db.collection(collectionName).doc(doc.id).collection('store').get();
              
              // Process each document in 'store' subcollection
              const storePromises = storeSnapshot.docs.map(async storeDoc => {
                let storeData = { id: storeDoc.id, ...storeDoc.data() };
    
                // Get 'menu' subcollection for each 'store' document
                const menuSnapshot = await db.collection(collectionName).doc(doc.id)
                  .collection('store').doc(storeDoc.id).collection('menu').get();
                let menus = menuSnapshot.docs.map(menuDoc => ({ id: menuDoc.id, ...menuDoc.data() }));
                storeData.menus = menus;
    
                // Get 'post' subcollection for each 'store' document
                const postSnapshot = await db.collection(collectionName).doc(doc.id)
                  .collection('store').doc(storeDoc.id).collection('post').get();
                let posts = postSnapshot.docs.map(postDoc => ({ id: postDoc.id, ...postDoc.data() }));
                storeData.posts = posts;
    
                return storeData;
              });
    
              docData.stores = await Promise.all(storePromises);
              return docData;
            });
    
            tempData = await Promise.all(promises);
            setData(tempData);
            console.log("finish");
          } catch (error) {
            console.error("Error fetching data: ", error);
          }
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