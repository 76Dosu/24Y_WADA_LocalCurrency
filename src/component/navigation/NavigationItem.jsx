import React from "react";
import styled from "styled-components";

//styled
const NavItemFrame = styled.div`
    width:57px;

    display:flex;
    flex-direction: column;
    align-items:center;
`

const NavIcon = styled.img`
    width:32px;
    height:32px;
`

const NavTitle = styled.p`
    font-size:12px;
    font-weight:400;

    margin-top:12px;
`

function NavigationItem(props) {

    const { onClick } = props;

    return (

        <NavItemFrame onClick={onClick}>
            <NavIcon src={props.imageUrl}></NavIcon>
            <NavTitle>{props.navTitle}</NavTitle>
        </NavItemFrame>

    )

}

export default NavigationItem;