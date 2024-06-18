import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { db } from "../../firebase.js"    // firebase 설정 가져오기

//component
import Navigation from "../navigation/Navigation";
import Header from "../header/Header";
import FixedTop from "../header/FixedTop";
import TextInput from "../ui/TextInput";
import PostList from "../list/PostList";

//images
import searchIcon from "../../images/searchIcon.png"

//styled
const Wrapper = styled.div`
    width: 100%;
    height:calc(100vh - 103px - 114px);
    margin: 103px 0px 114px 0px;
`;

const SearchContainer = styled.div`
    padding: 12px 20px;
    height: 64px;
    width: 100%;
    display: flex;
    align-items: center;
`;

const FilterButton = styled.div`
    width: 40px;
    height: 40px;
    background-color: #F3F4F5;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px; 
`;

const FilterImage = styled.img`
    width: 20px;
    height: 20px;
`;

const TextInputWrapper = styled.div`
    flex-grow: 1;
`;

const TabContainer = styled.div`
    display: flex;
    align-items: center;
    height: 70px;
    padding-inline: 20px;
`;

const MapTabButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  font-size: 14px;
  font-weight: bold;
  color: ${props => (props.active ? '#FFFFFF' : '#585858')};
  position: relative;
  transition: all 0.3s;
  z-index: 1;
`;

const MapTab = styled.div`
    display: flex;
    width: 100%;
    height: 40px;
`;
const MapTabCover = styled.div`
    width: 90%;
    height: 50px;
    position: relative;
    border: 1px solid #EEEEEE;
    border-radius: 25px;
    padding:5px;
    margin-inline: auto;
`;

const BlueBar = styled.div`
    position: absolute;
    width: calc(50% - 5px);
    height: 40px;
    border-radius: 25px; 
    background-color: #3182F7;
    transition: transform 0.3s;
    float: left;
    transform: ${props => (props.active ? 'translateX(0)' : 'translateX(100%)')};
    z-index: -1;
`;

const PostContainer = styled.div`
    width:100%;
`

function CommunityPage(props) {
    const [mapTab, setMapTab] = useState(1);
    const [data, setData] = useState([])
    const navigate = useNavigate();

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
            <Header backLink="/" headerTitle="커뮤니티"></Header>
            <SearchContainer>
                <FilterButton onClick={() => { }}>
                    <FilterImage src="/filterButton.png"></FilterImage>
                </FilterButton>
                <TextInputWrapper>
                    <TextInput placeholder="카테고리 또는 가맹점 입력" icon={searchIcon} />
                </TextInputWrapper>
            </SearchContainer>
            <TabContainer>
                <MapTabCover>
                    <MapTab>
                        <BlueBar active={mapTab === 1}></BlueBar>
                        <MapTabButton active={mapTab === 1} onClick={() => setMapTab(1)}>
                            추천
                        </MapTabButton>
                        <MapTabButton active={mapTab === 2} onClick={() => setMapTab(2)}>
                            팔로우
                        </MapTabButton>
                    </MapTab>
                </MapTabCover>
            </TabContainer>
            <PostContainer>
                <PostList posts={data} onClickItem={(p) => { navigate('/post/' + p.id, {state: p}) }} />
            </PostContainer>
            <Navigation></Navigation>
        </Wrapper>
    );
}

export default CommunityPage;
