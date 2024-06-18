import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//component
import MyStoreGrid from "../list/MyStoreGrid";
import StoreItem from '../items/StoreItem';
import TestMap from '../map/TestMap';

import { db } from "../../firebase.js";    // firebase 설정 가져오기

//styled
const Wrapper = styled.div`
    width: 100%;
    position: relative;
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
    height: calc(100vh - ${props => props.minheight || 280}px);
    overflow: ${props => props.overflow || "auto"};
`;

const ContentWrapper = styled.div`
    width: 100%;
    padding: ${props => props.padding || "0 20px 20px 20px"} ;
`;

const MapTabContainer = styled.div`
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

const FilterButtonContainer = styled.div`
    width: 15%;
    display: flex;
    align-items: center;
    text-align: center;
`;

const FilterButton = styled.img`
    width: 20px;
    height: 20px;
    margin:auto;
`;

const FilterButtonCover = styled.div`
    display: flex;
    text-align: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: #F3F4F5;
    border-radius: 20px;
    margin-left:auto;
`;

// SlideUpPanel 스타일 정의
const BackgroundOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000066;
    z-index: 999; /* Ensure overlay is above other content */
    display: ${(props) => (props.visible ? 'block' : 'none')};
`;

const SlideUpPanel = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 218px;
    border-radius: 20px 20px 0px 0px;
    background-color: white;
    box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
    transform: ${(props) => (props.visible ? 'translateY(0)' : 'translateY(100%)')};
    transition: transform 0.3s ease-in-out;
    padding: 20px;
    z-index: 1000; /* Ensure SlideUpPanel is above Navigation */
`;

const SlideUpPanelTitle = styled.div`
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  padding-bottom: 20px;
`;

const SlideUpPanelOff = styled.div`
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  padding-top: 20px;
  cursor: pointer; /* Add cursor pointer to indicate clickability */
`;

const SortType = styled.div`
    display: flex;
    gap: 30px;
    width: 100%;
    flex-direction: column;
    padding-top: 20px;
`;

const SortBar = styled.div`
    width: 100%;
    display:flex;
`;

const SortTypeName = styled.p`
    font-size:16px;
    font-weight:400;
    color:#333;
`;

const SelectIcon = styled.img`
    margin-left: auto;
    height: 20px;
    width: 20px;
`;

function Tabs(props) {
    const { minWidthPer, tabType, tabList, nowState, data } = props;
    // 탭바 밑에 컨텐츠 영역 높이 조절하려면 ContentArea, TabContent 두 컴포넌트의 css 속성 height: calc() 수정해주면됨 (둘다 변경해줘야함)

    const categoryLabel = ['한식', '중식'];

    const myStoreList = ['뜨끈이감자탕', '생금마을', '카페39', '뜨끈이감자탕', '생금마을', '카페39'];
    const recentStoreList = ['27%', '함돈'];

    const [activeTab, setActiveTab] = useState(nowState || 0);
    const [mapTab, setMapTab] = useState(1);
    const [isFilterPanelVisible, setFilterPanelVisible] = useState(false); // 필터 패널의 가시성 상태를 관리하기 위한 상태
    const [selectedSortType, setSelectedSortType] = useState('likes'); // 체크박스 기능을 위한 상태 추가

    const tabContainerRef = useRef(null);
    const navigate = useNavigate();

    const [recentVisitData, setRecentVisitData] = useState([]);
    const [bookMarkData, setBookMarkData] = useState([]);

    useEffect(function () {
        let tempData = [];
        db.collection('recentVisitStores').doc('recentVisit').get().then(function (doc) {
            const tempDocData = doc.data();
            tempData.push(...tempDocData.recentVisitArray);
            setRecentVisitData(tempData);
        });
    }, []);
    
    useEffect(function () {
        let tempData = [];
        db.collection('bookMarkStores').doc('bookMark').get().then(function (doc) {
            const tempDocData = doc.data();
            tempData.push(...tempDocData.bookMarkArray);
            setBookMarkData(tempData);
        });
    }, []);

    useEffect(() => {
        const tabContainer = tabContainerRef.current;
        const activeTabElement = tabContainer.children[activeTab];
        if (activeTabElement) {
            tabContainer.scrollTo({
                left: activeTabElement.offsetLeft,
                // behavior: 'smooth',
            });
        }
    }, [activeTab]);

    const handleSortTypeClick = (sortType) => {
        setSelectedSortType(sortType);
    };

    const handleOverlayClick = () => {
        setFilterPanelVisible(false);
    };

    const contents = tabList.map((tab, i) => (
        <>
            {tabType === '카테고리' && (
                <TabContent minheight={350} key={i}>
                    <ContentWrapper>
                        {data.map((item) => (
                            <>
                                {item.stores && item.stores.map(store => (
                                    <>
                                        {Number(item.id) === i &&
                                            <>
                                                <StoreItem data={store} heightRatio={40} listType={'카테고리'} onClickItem={function(s, is){
                                                    navigate("/store/" + s.id, {state: [s, is]});
                                                }}></StoreItem>
                                            </>
                                        }
                                    </>
                                ))}
                            </>
                        ))}
                    </ContentWrapper>
                </TabContent>
            )}
            {tabType === '나의가맹점' && (
                <TabContent minheight={280} key={i}>
                    <>
                        {i === 0 &&
                            <>
                                <MyStoreGrid data={data} tabData={bookMarkData} stores={myStoreList} onClickItem={function(s){
                                                    navigate("/store/" + s.id, {state: [s, 1]});
                                                }}></MyStoreGrid>
                            </>
                        }
                        {i === 1 &&
                            <>
                                <MyStoreGrid data={data} tabData={recentVisitData} stores={myStoreList} onClickItem={function(s){
                                                    navigate("/store/" + s.id, {state: [s, 0]});
                                                }}></MyStoreGrid>
                            </>
                        }
                    </>
                </TabContent>
            )}
        </>
    ));
    
    const mapContents = (
        <>
            <TabContent overflow={"hidden"} minheight={350}>
                <ContentWrapper padding={"0"}>
                    <TestMap data={data} nowTabIndex={activeTab}></TestMap>
                </ContentWrapper>
            </TabContent>
        </>
    );

    return (
        <Wrapper>
            {tabType === '카테고리' && (
                <>
                    <TempTabContainer ref={tabContainerRef}>
                        {tabList.map((tab, index) => (
                            <TabButton
                                key={index}
                                min_width_per = {minWidthPer || 22}
                                active={activeTab === index}
                                onClick={() => setActiveTab(index)}
                            >
                                {tab}
                            </TabButton>
                        ))}
                    </TempTabContainer>
                    <MapTabContainer>
                        <MapTabCover>
                            <BlueBar active={mapTab === 1}></BlueBar>
                            <MapTab>
                                <MapTabButton active={mapTab === 1} onClick={() => setMapTab(1)}>
                                    목록
                                </MapTabButton>
                                <MapTabButton active={mapTab === 2} onClick={() => setMapTab(2)}>
                                    지도
                                </MapTabButton>
                            </MapTab>
                        </MapTabCover>

                        <FilterButtonContainer>
                            <FilterButtonCover>
                                <FilterButton src={"/filterButton.png"} onClick={() => setFilterPanelVisible(true)}></FilterButton> {/* 필터 버튼 클릭 시 필터 패널 표시 */}
                            </FilterButtonCover>
                        </FilterButtonContainer>
                    </MapTabContainer>
                    {mapTab === 1 && (
                        <ContentArea>
                            <TabContentContainer activeTab={activeTab}>
                                {contents}
                            </TabContentContainer>
                        </ContentArea>
                    )}
                    {mapTab === 2 && (
                        <ContentArea>
                            {mapContents}
                        </ContentArea>
                    )}
                </>
            )}
            {tabType === '나의가맹점' && (
                <>
                    <TempTabContainer ref={tabContainerRef}>
                        {tabList.map((tab, index) => (
                            <TabButton
                                key={index}
                                min_width_per = {minWidthPer || 22}
                                active={activeTab === index}
                                onClick={() => setActiveTab(index)}
                            >
                                {tab}
                            </TabButton>
                        ))}
                    </TempTabContainer>
                    <ContentArea minheight={280}>
                        <TabContentContainer activeTab={activeTab}>
                            {contents}
                        </TabContentContainer>
                    </ContentArea>
                </>
            )}

            {/* 배경 오버레이 */}
            <BackgroundOverlay visible={isFilterPanelVisible} onClick={handleOverlayClick} />

            {/* 슬라이드업 패널 */}
            <SlideUpPanel visible={isFilterPanelVisible}>
                <SlideUpPanelTitle>정렬</SlideUpPanelTitle>
                <SortType>
                    <SortBar onClick={() => handleSortTypeClick('likes')}>
                        <SortTypeName>좋아요 순</SortTypeName>
                        <SelectIcon src="/check.png" style={{ display: selectedSortType === 'likes' ? 'block' : 'none' }} />
                    </SortBar>
                    <SortBar onClick={() => handleSortTypeClick('distance')}>
                        <SortTypeName>거리 순</SortTypeName>
                        <SelectIcon src="/check.png" style={{ display: selectedSortType === 'distance' ? 'block' : 'none' }} />
                    </SortBar>
                </SortType>
                <SlideUpPanelOff onClick={() => setFilterPanelVisible(false)}>닫기</SlideUpPanelOff> {/* 닫기 버튼 클릭 시 패널 숨기기 */}
            </SlideUpPanel>
        </Wrapper>
    );
}

export default Tabs;
