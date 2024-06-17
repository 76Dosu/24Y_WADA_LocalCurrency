import React from 'react'
import styled from "styled-components";

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
`;


const ButtonContainer = styled.div`
    margin-top: 32px;
    display: flex;
    justify-content: center;
`;

function Postbutton(props){
    const { onClick } = props;
    return (
        <ButtonContainer>
            <StyledButton onClick={onClick}>
                포스트 작성하기
            </StyledButton>
        </ButtonContainer>
    )
}

export default Postbutton;
