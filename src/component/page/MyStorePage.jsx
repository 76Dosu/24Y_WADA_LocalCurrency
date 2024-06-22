import React, { useState, useEffect } from 'react';
import styled from "styled-components";

//component
import Navigation from "../navigation/Navigation";
import Header from "../header/Header";
import FixedTop from "../header/FixedTop";
import Tabs from "../tab/Tabs";

import { db } from "../../firebase.js"    // firebase 설정 가져오기

//styled
const Wrapper = styled.div`
    width:100%;
    height:calc(100vh - 103px - 114px);
    margin:103px 0 114px 0px;
`


function MyStorePage(props) {


    const myPageTab = ['즐겨찾는', '최근방문한'];

    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("start");
        const fetchData = async () => {
          let tempData = [];
          const collectionName = "dummyData";
    
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
            <Header backLink={-1} headerTitle="MY 플레이스"></Header>
            

            <Tabs data={data} minWidthPer={50} tabType={'MY플레이스'} tabList={myPageTab} nowState={0}></Tabs>
            <Navigation></Navigation>
        </Wrapper>
    
    )

}

export default MyStorePage;