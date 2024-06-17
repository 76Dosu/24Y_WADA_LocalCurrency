import React, { useRef } from 'react'
import styled from "styled-components";

const StyledTextArea = styled.textarea`
    width: ${props => props.width};
    height: ${props => props.height}px;
    padding: 8px 0;
    font-size: ${props => props.fontSize}px;
    line-height: 20px;
    display: block;
    resize: none;
    border: 1px solid #fff;
    border-radius: ${props => props.borderRadius}px;
    outline: none;
    max-height:260px;

    &::placeholder {
        color: ${props => props.placeholderColor || '#888'};
        font-size: ${props => props.placeholderFontSize || '16px'};
    }
`

function TextInputWrite(props) {

    const { 
        border, 
        width, 
        height, 
        fontSize,
        value, 
        onChange, 
        placeholder, 
        placeholderColor, 
        placeholderFontSize 
    } = props;

    const inputTag = useRef(null);
    const longerTextArea = (event, tag) => {
        if (event.keyCode === 13 || 8) {
            tag.current.style.height = `auto`;
            tag.current.style.height = `${inputTag.current.scrollHeight}px`;
        }
    };

    return (
        <StyledTextArea ref={inputTag} onKeyUp={(event) => longerTextArea(event, inputTag)}
            borderRadius={border || 6} 
            height={height || 20} 
            width={width || '100%'}
            fontSize={fontSize || 16} 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder}
            placeholderColor={placeholderColor}
            placeholderFontSize={placeholderFontSize}
        />
    )
}

export default TextInputWrite
