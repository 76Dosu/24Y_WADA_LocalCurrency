import React from "react";
import styled from "styled-components";

//component
import Navigation from "../navigation/Navigation";
import Header from "../header/Header";

//styled
const Wrapper = styled.div`
    width:100%;
`

function MainPage(props) {

    return (

        <Wrapper>
            <Header backLink="/" headerTitle="가맹점 찾기"></Header>
            <Navigation></Navigation>
        </Wrapper>

    )

}

export default MainPage;