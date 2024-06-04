import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    background-color: ${(props) => props.$background || "#F3F4F5"};
    height: ${props => props.$height};
    width: 100%;
    color: #585858;
    border-radius: 32px;
    align-items: center;
    padding: 0px 20px;
`

const StyledTextArea = styled.textarea`
    background-color: transparent;
    height: auto;
    width: 100%;
    border: none;
    outline: none;
    font-size: 14px;
    line-height: auto;
    vertical-align: middle;
    padding: 8px;
`;

const InputImg = styled.img`
    width: 20px;
    height: 20px;
    display: flex;
    padding: 0;
    margin: 0;
`

function TextInput(props) {

    const { height, value, onChange } = props;

    return (
        <Wrapper $height={height || "40px"}>
            <InputImg src="/logo192.png" alt="logo" />
            <StyledTextArea  value={value} onChange={onChange}></StyledTextArea>
        </Wrapper>
    )

}

export default TextInput;
