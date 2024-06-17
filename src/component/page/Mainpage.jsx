import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";

//component
import Navigation from "../navigation/Navigation";
import SearchHeader from "../header/SearchHeader.jsx";
import FixedTop from "../header/FixedTop";
import CateGrid from "../list/CateGrid";
import DividedDiv from "../ui/DividedDiv.jsx";
import BalanceFrame from "../items/BalanceFrame.jsx";

import { db } from "../../firebase.js"    // firebase 설정 가져오기

//image
import BannerImage from "../../images/main-banner.png"

//styled
const Wrapper = styled.div`
    width:100%;
    height:calc(100vh + 16px);
`
const Tag = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: #1C170D;
    margin-left:20px;
    margin-top: 20px;
`

const Banner = styled.div`
    width:100%;
    padding:16px 20px;
    background-color:white;
`

const BannerImg = styled.img`
    width:100%;
`

function MainPage(props) {

    const navigation = useNavigate();

    const categoryLabel = ['한식', '중식', '일식', '양식', '패스트푸드',
        '카페', '베이커리', '편의점/마트', '의료/보건', '학원/교육',
        '스포츠/헬스', '도서/문화', '시장/거리', '자동차', '부동산'];



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
            <SearchHeader backLink="/" headerTitle="가맹점 찾기"></SearchHeader>

            {/* 광고 배너 */}
            <Banner>
                <BannerImg src={BannerImage}></BannerImg>
            </Banner>
            <DividedDiv></DividedDiv>

            {/* 현재 잔액 표시 */}
            <BalanceFrame></BalanceFrame>
            <DividedDiv></DividedDiv>

            <Tag>카테고리</Tag>
            <CateGrid categories={categoryLabel} onClickItem={function (p) {
                navigation('/category', { state: p })
            }}></CateGrid>
            <DividedDiv></DividedDiv>
            {/* <div>
                {data.map(item => (
                    <div key={item.id}>
                        <h2>{item.name}</h2>
                        <h2>{item.id}카테고리번호</h2>
                        {item.stores && item.stores.map(store => (
                            <div key={store.id}>
                                <h3>{store.name}</h3>
                                <h3>{store.id}</h3>
                                <h4>Menus:</h4>
                                <ul>
                                    {store.menus && store.menus.map(menu => (
                                        <li key={menu.id}>{menu.menuName} - {menu.menuPrice}원</li>
                                    ))}
                                </ul>
                                <h4>Posts:</h4>
                                <ul>
                                    {store.posts && store.posts.map(post => (
                                        <>
                                            <li key={post.id}>{post.title}</li>
                                            <li key={post.id}>{post.postImage}</li>
                                        </>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ))}
            </div> */}
            <Navigation></Navigation>
        </Wrapper>

    )

}

export default MainPage;