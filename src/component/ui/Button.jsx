import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    background-color: ${(props) => props.$background || "#3182F7"};
    height: ${(props) => props.$height || "auto"};
    width: ${(props) => props.$width || "auto"};
    color: ${(props) => props.$color || "#fff"};;
    border: 1px solid #3182F7;
    font-size:16px;
    font-weight: bold;
    padding: 10px;
    border-radius:20px;
`

function Button(props){

    const { background, color, height, width, title, onClick } = props;

    return (
        <StyledButton 
        $background={background}
        $color={color}
        $height={height}
        $width={width}
        onClick={onClick}>
            {title || "Button"}
        </StyledButton>
    )
}

export default Button;
