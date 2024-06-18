import React from "react";
import styled from "styled-components";
import StoreItem from "../items/StoreItem";

const Wrapper = styled.div`
    display:flex;
    align-items: flex-start;
    gap:16px;
`

function StoreList(props) {
    
    const { menus } = props;

    return (
        <Wrapper>
            {menus.map((menu, index) => { 
                return (
                    <StoreItem listType='메뉴' data={menu} heightRatio={40}></StoreItem>
                )

            })}
        </Wrapper>
    )

}

export default StoreList;