import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
    padding: 12px 0;
    border-bottom: 1px solid ${({ borderColor }) => borderColor || "#E8F2FB"};
`;

const StoreName = styled.h4`
    font-size: 18px;
    margin-bottom: 6px;
    font-weight: 300;
`;

const Address = styled.p`
    font-size: 14px;
    color: #3182F7;
    display: flex;
    align-items: center;
    margin-left: -2px;
`;

const LocationIcon = styled.img`
    width: 16px;
    height: 16px;
    object-fit: cover;
    margin-right: 4px;
`;

function LocationInfo({ storeName, address, borderColor, onClick }) {
    return (
        <Wrapper borderColor={borderColor} onClick={onClick}>
            <StoreName>{storeName}</StoreName>
            <Address><LocationIcon src={"/location.png"} />{address}</Address>
        </Wrapper>
    );
}

export default LocationInfo;
