import React from "react";
import styled from "styled-components";
import StoreItem from "../items/StoreItem";

const Wrapper = styled.div`
    display:flex;
    flex-direction:row;
    flex-wrap: wrap;
    align-items: flex-start;
`

function StoreList(props) {
    
    const { menus } = props;

    return (
        <Wrapper>
            {menus.map((post, index) => { 
                return (
                    <StoreItem listType='메뉴' name={post.menuName} price={post.menuPrice} image={post.menuImage}></StoreItem>
                )

            })}
        </Wrapper>
    )

}

export default StoreList;