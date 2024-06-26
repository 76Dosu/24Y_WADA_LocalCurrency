import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import styled from 'styled-components';

// 스타일 정의
const MapContainer = styled.div`
  width: 100%;
  height: 580px;

  &:focus {
    outline: none;
  }
`;
const SlideUpPanel = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  transform: ${(props) => (props.visible ? 'translateY(0)' : 'translateY(100%)')};
  transition: transform 0.3s ease-in-out;
  padding: 20px;
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
// 커스텀 마커 아이콘


function TestMap(props) {
    const { data, nowTabIndex } = props;
    const [selectedLocation, setSelectedLocation] = useState(null);
    const handleMarkerClick = (location) => {
        setSelectedLocation(location);
    };
    return (
        <MapContainer>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%', outline: 'none' }}
                    center={center}
                    zoom={15}
                    options={mapOptions}
                >
                    {data.map(item => (
                        <>
                            {item.stores && item.stores.map(store => (
                                <>
                                    {Number(item.id) === nowTabIndex &&
                                        <>
                                            <Marker
                                                key={store.id}
                                                position={{ lat: store.locationX, lng: store.locationY }}
                                                onClick={() => handleMarkerClick({ lat: store.locationX, lng: store.locationY })}
                                            />
                                        </>
                                    }
                                </>
                            ))}

                        </>

                    ))}
                    <Marker position={center}
                        onClick={() => handleMarkerClick(center)} />
                </GoogleMap>
            </LoadScript>
            <SlideUpPanel visible={!!selectedLocation}>
                {selectedLocation && (
                    <>
                        <h2>{selectedLocation.name}</h2>
                        <p>{selectedLocation.description}</p>
                    </>
                )}
            </SlideUpPanel>
        </MapContainer>
    );
}



export default TestMap;
