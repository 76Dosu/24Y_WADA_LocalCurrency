import React from "react";
import styled from "styled-components";

//component

//images
import searchIcon from "../../images/searchIcon.png"

//style
const Wrapper = styled.div`
    width:100%;
    padding:20px 16px;
    background:white;
    box-shadow:0px 4px 4px rgba(0, 0, 0, 0.04);

    display:flex;
    align-items:center;

    position:fixed;
    top:43px;
    left:0;
    z-index:1;
`

const BackIcon = styled.img`
    width:80px;
    height:25px;
`


const SerachIcon = styled.img`
    width:20px;
    height:20px;
    margin-left:auto;
`

function SearchHeader(props) {


    return (

        <Wrapper>
            <BackIcon src={"/chak.png"}></BackIcon>

            <SerachIcon src={searchIcon}></SerachIcon>
        </Wrapper>

    )

}

export default SearchHeader;