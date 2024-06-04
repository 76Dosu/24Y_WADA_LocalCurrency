import React from "react";
import styled from "styled-components";

//component
import Navigation from "../navigation/Navigation";
import Header from "../header/Header";
import FixedTop from "../header/FixedTop";

//styled

const Wrapper = styled.div`
    width:100%;
`

function communityPage(props) {

    return (

        <Wrapper>
            <FixedTop></FixedTop>
            <Header backLink="/" headerTitle="포스팅"></Header>
            <Navigation></Navigation>
        </Wrapper>
    
    )

}

export default communityPage;