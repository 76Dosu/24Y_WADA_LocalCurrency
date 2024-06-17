import React from "react";
import styled from "styled-components";

const DividedDivFrame = styled.button`
    width:100%;
    height:8px;
    background-color: #f2f2f2;
    border-top:2px solid #dfdfdf;
    border-bottom:none;
    border-left:none;
    border-right:none;
`

function DividedDiv(props){

    return (
        
        <DividedDivFrame></DividedDivFrame>

    )
}

export default DividedDiv;
