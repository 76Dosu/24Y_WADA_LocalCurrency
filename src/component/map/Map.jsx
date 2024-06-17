import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import styled from 'styled-components';

// 스타일 정의
const MapContainer = styled.div`
  width: 100%;
  height: 400px;
`;

const center = {
  lat: 37.7749,
  lng: -122.4194
};

function MyMapComponent() {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={10}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

const StyledMapComponent = () => (
  <MapContainer>
    <MyMapComponent />
  </MapContainer>
);

export default StyledMapComponent;
