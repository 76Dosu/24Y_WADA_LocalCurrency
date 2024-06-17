import React from 'react'
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";

const StyledButton = styled.button`
    padding:12px 0;
    border:0;
    background-color: #3182F7;
    color:#ffffff;
    cursor:pointer;
    width: 100%;
    height: 51px;
    border-radius: 25.5px;
    font-size: 16px;
    /* border-top: 1px solid #F5F0E5; */

    font-size:16px;
    font-weight:bold;
`;

const ButtonContainer = styled.div`
    position: fixed;
    display:flex;
    padding:12px 20px;

    width:100%;
    bottom:0px;
    left:0;
    border-top:1px solid #f5f5f5;
    justify-content: center;
`;

function Postbutton(props) {

    const { title, onClick } = props;

    return (
        <ButtonContainer onClick={onClick}>
            <StyledButton>
                {title}
            </StyledButton>
        </ButtonContainer>
    )
}

export default Postbutton;
