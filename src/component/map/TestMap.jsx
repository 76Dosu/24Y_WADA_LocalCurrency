import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

//Compontents

//image
import dummyImage from "../../images/dummyImage.png"

// 스타일 정의
const MapContainer = styled.div`
  width: 100%;
  height: 580px;

  &:focus {
    outline: none;
  }
`;

const SwipeBar = styled.div`
    width:20%;
    height:2px;
    background-color:#999999;
    margin:0 auto;
    margin-bottom:16px;
`

// style - 슬라이드 업 패널
const SlideUpPanel = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 320px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  transform: ${(props) => (props.visible ? 'translateY(0)' : 'translateY(100%)')};
  transition: transform 0.3s ease-in-out;
  padding: 20px;
`;

const StoreTitle = styled.div`
    width:100%;
    display:flex;
    align-items: flex-end;
    gap:4px;
`
const StoreName = styled.p`
    font-size:16px;
    font-weight:400;
    color:#333;
`
const StorePos = styled.p`
    font-size:16px;
    font-weight:400;
    color:#333;
`

const StoreInfo = styled.div`
    display:flex;
    align-items:center;
    margin-top:4px;
`

const LikeContainer = styled.div`
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 5px;
`;
const Icon = styled.img`
        width: 16px;
        height: 16px;
        text-align: center;
    `;
const Numb = styled.p`
        font-size: 14px;
        color: #66707A;
    `;

const StoreDistance = styled.p`
    font-size:14px;
    color:#777;
`

const LastIcon = styled(Icon)`
    margin-left: auto;
`;

const center = {
    lat: 37.340637,
    lng: 126.733017
};

const mapOptions = {
    disableDefaultUI: true, // 모든 기본 UI 컨트롤 비활성화
    zoomControl: false, // 확대/축소 컨트롤 비활성화
    mapTypeControl: false, // 지도/위성 선택 컨트롤 비활성화
    scaleControl: false, // 거리 축척 컨트롤 비활성화
    streetViewControl: false, // 로드뷰 컨트롤 비활성화
    rotateControl: false, // 회전 컨트롤 비활성화
    fullscreenControl: false // 전체화면 컨트롤 비활성화
};

const StoreImageFrame = styled.div`
    width:100%;
    height:100px;
    margin-bottom:8px;

    overflow-x: auto;
    display:flex;
`

const ImageScroll = styled.div`
    display: flex;
    width: 100%;
`

const DummyImage = styled.img`
    height:100%;
    width:33%;
    object-fit: cover;
    margin-right:12px;
    border-radius:4px;
`

function TestMap(props) {
    const { data, nowTabIndex } = props;
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [infoWindowPosition, setInfoWindowPosition] = useState(null);
    const [infoWindowContent, setInfoWindowContent] = useState(null);
    const [customIcon, setCustomIcon] = useState(null);
    const navigate = useNavigate();

    const [bookMark, setBookmark] = useState("off")

    const handleMarkerClick = (location) => {
        setSelectedLocation(location);
    };

    const handleCenterClick = () => {
        setInfoWindowPosition({ lat: 37.340637, lng: 126.733017 });
        setInfoWindowContent("현재위치");
    };

    const handleMapClick = () => {
        setSelectedLocation(null);
        setInfoWindowPosition(null);
        setInfoWindowContent(null);
    };

    const handleLoadScript = () => {
        const icon = {
            path: "M 0, 0 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0", // 원형 아이콘 경로
            fillColor: "blue", // 원하는 색상으로 변경
            fillOpacity: 1,
            strokeWeight: 8, // 외곽선 두께 설정
            strokeColor: "#3182F7", // 외곽선 색상
            scale: 1, // 아이콘 크기 조정
            anchor: new window.google.maps.Point(0, 0)
        };
        setCustomIcon(icon);
    };

    const infoWindowOptions = {
        disableAutoPan: true, // 자동 패닝 비활성화 (close 버튼 숨김)
    };

    return (
        <MapContainer>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} onLoad={handleLoadScript}>
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%', outline: 'none' }}
                    center={center}
                    zoom={15}
                    options={mapOptions}
                    onClick={handleMapClick}
                >
                    {data.map(item => (
                        Number(item.id) === nowTabIndex &&
                        item.stores.map(store => (
                            <Marker
                                key={store.id}
                                position={{ lat: store.locationX, lng: store.locationY }}
                                onClick={() => handleMarkerClick(store)}
                            />
                        ))
                    ))}
                    <Marker position={center} icon={customIcon} onClick={handleCenterClick} />
                    {infoWindowPosition && (
                        <InfoWindow position={infoWindowPosition} options={infoWindowOptions} onCloseClick={handleMapClick}>
                            <div>{infoWindowContent}</div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>

            
            {/* 슬라이드 업 패널 */}
            <SlideUpPanel visible={!!selectedLocation} onClick={function () {
                navigate("/store/" + selectedLocation.id, { state: [selectedLocation, 0] })}} >
                {selectedLocation && (
                    <>
                        <SwipeBar></SwipeBar>

                        <StoreImageFrame>
                            <ImageScroll>
                                <DummyImage src={selectedLocation.storeImage}></DummyImage>
                                {selectedLocation.posts.map((post) => {
                                    return (
                                        <DummyImage src={post.postImage}></DummyImage>
                                    )
                                })}
                            </ImageScroll>

                        </StoreImageFrame>

                        <StoreTitle>
                            <StoreName>{selectedLocation.name}</StoreName>
                            <StorePos>{selectedLocation.branchName}</StorePos>
                        </StoreTitle>

                        <StoreInfo>
                            <StoreDistance>230m ㅣ</StoreDistance>
                            <LikeContainer>
                                <Icon src={"/LikeBlue.png"}></Icon>
                                <Numb>132</Numb>
                            </LikeContainer>

                            {bookMark === 'on' && (
                                <LastIcon onClick={() => setBookmark('off')} src={"/StarOn.png"}></LastIcon>
                            )}
                            {bookMark === 'off' && (
                                <LastIcon onClick={() => setBookmark('on')} src={"/StarOff.png"}></LastIcon>
                            )}
                        </StoreInfo>
                    </>
                )}
            </SlideUpPanel>
        </MapContainer >
    );
}

export default TestMap;
