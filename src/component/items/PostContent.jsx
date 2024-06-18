import React from "react";
import styled from "styled-components";

// compotents

// image

// styled
const PostContentText = styled.p`
    font-size:16px;
    font-weight:400;
    line-height:1.4;
    color:#333;
    text-align:justify;
`

function PostContent(props){

    const { contents } = props;

    return (

        <PostContentText>{contents}</PostContentText>

    )
}

export default PostContent;
