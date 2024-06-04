import React from "react";
import styled from "styled-components";

//component
import Navigation from "../navigation/Navigation";

//styled
const Wrapper = styled.div`
    width:100%;
    height:100px;
    background-color:dodgerblue;
`

function MainPage(props) {

    return (

        <Wrapper>
            <Navigation></Navigation>
        </Wrapper>

    )

}

export default MainPage;