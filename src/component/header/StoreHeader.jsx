import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//component

//images
import backIcon from "../../images/back.png"


//style
const Wrapper = styled.div`
    width:100%;
    padding:20px 16px;
    background:white;
    box-shadow:0px 4px 4px rgba(0, 0, 0, 0.04);

    display:flex;
    align-items:center;
`

const BackIcon = styled.img`
    width:16px;
    height:16px;
    margin-right:16px;
`

const HeaderTitleText = styled.p`
    font-size: 16px;
    font-weight: 500;
    color:var(--main-textColor);
`

function StoreHeader(props) {

    const navigation = useNavigate();
    const { backLink, headerTitle } = props;

    return (

        <Wrapper>
            <BackIcon onClick={() => {navigation(`${backLink}`)}} src={backIcon}></BackIcon>
            <HeaderTitleText>{headerTitle || "뜨끈이 감자탕"}</HeaderTitleText>
        </Wrapper>

    )

}

export default StoreHeader;