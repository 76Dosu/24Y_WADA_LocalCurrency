import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

//component
import Navigation from "../navigation/Navigation";
import FixedTop from "../header/FixedTop";
import StoreHeader from "../header/StoreHeader";

//styled
const TestTitle = styled.p`
    display:flex;
    align-items:center;
    justify-content:center;
    height:100%;

    font-size:24px;
`

const Wrapper = styled.div`
    width:100%;
    height:100px;
    background-color:yellow;
`

function StoreDetailPage(props) {
    
    const { headerTitle } = props;
    // const location = useLocation();
    // const queryString = location.headerTitle;

    return (

        <Wrapper>
            <FixedTop />
            <StoreHeader backLink="/category" headerTitle={headerTitle}/>

            <Navigation></Navigation>
        </Wrapper>
    
    )

}

export default StoreDetailPage;