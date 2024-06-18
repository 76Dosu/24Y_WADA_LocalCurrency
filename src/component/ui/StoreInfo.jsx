import React from "react";
import styled from "styled-components";

//style
const Wrapper = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    margin-bottom:8px;

    &:last-child {
        margin-bottom:0px;
    }
`

const InfoIcon = styled.img`
    width:16px;
    height:16px;
    margin-right:4px;
`

const InfoText = styled.p`
    font-size:14px;
`

function StoreInfo(props){

    return (
        
        <Wrapper>
            <InfoIcon src={props.src}></InfoIcon>
            <InfoText>{props.content}</InfoText>
        </Wrapper>

    )
}

export default StoreInfo;
