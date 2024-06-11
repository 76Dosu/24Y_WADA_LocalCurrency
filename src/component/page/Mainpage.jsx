import React from "react";
import styled from "styled-components";

//component
import Navigation from "../navigation/Navigation";
import Header from "../header/Header";
import FixedTop from "../header/FixedTop";
import CateGrid from "../list/CategorieGrid";

//styled
const Wrapper = styled.div`
    width:100%;
`
const Tag = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: #1C170D;
    margin-left:20px;
    margin-top: 20px;
`
function MainPage(props) {

    return (

        <Wrapper>
            <FixedTop></FixedTop>
            <Header backLink="/" headerTitle="가맹점 찾기"></Header>
            <Tag>카테고리</Tag>
            <CateGrid></CateGrid>
            <Navigation></Navigation>
        </Wrapper>

    )

}

export default MainPage;