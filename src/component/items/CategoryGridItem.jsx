import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    height: 75px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Icon = styled.img`
    width: 40px;
    height: 40px;
    margin-block: 10px;
`;
const Label = styled.p`
    font-size: 12px;
    font-weight: bold;
    color: #333333;
`;

function CategoryGridItem(props){
    // 
    const {index, label, onClick} = props;

    return (
        <Wrapper onClick={onClick}>
            <Icon src={"/cateIconSample.png"}></Icon>
            <Label>{label || "카테고리"}</Label>

            
        </Wrapper>
    )
}

export default CategoryGridItem;
