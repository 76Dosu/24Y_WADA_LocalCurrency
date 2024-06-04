import React from "react";
import styled from "styled-components";

//component
import Navigation from "../navigation/Navigation";

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

function MyStorePage(props) {

    return (

        <Wrapper>
            <TestTitle>나의 가맹점 페이지</TestTitle>
            <Navigation></Navigation>
        </Wrapper>
    
    )

}

export default MyStorePage;