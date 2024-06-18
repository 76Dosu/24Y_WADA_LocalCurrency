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
    border-radius:40px;
`

const InputImg = styled.img`
    width: 20px;
    height: 20px;
    display: flex;
    padding: 0;
    margin: 0;
`;

function Button(props){

    const { background, color, height, width, title, onClick, icon } = props;

    return (
            <StyledButton 
            $background={background}
            $color={color}
            $height={height}
            $width={width}
            onClick={onClick}>
                {title}
                {icon && <InputImg src={icon} alt="icon" />}
            </StyledButton>
            
    )
}

export default Button;
