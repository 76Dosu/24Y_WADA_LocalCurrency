import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//component
import NavigationItem from "./NavigationItem";

//images
import homeIcon from "../../images/home.png"
import recommendIcon from "../../images/recommend.png"
import communityIcon from "../../images/community.png"
import mypageIcon from "../../images/mypage.png"

//style
const NavigationFrame = styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;

    position:fixed;
    background-color:white;
    box-shadow:0px -4px 4px rgba(0, 0, 0, 0.04);

    bottom:0;
    left:0;
    padding:20px 20px 36px 20px;
`

function Navigation(props) {

    const navigation = useNavigate();

    return (

        <NavigationFrame>
            <NavigationItem onClick={() => {navigation('/')}} imageUrl={homeIcon} navTitle="홈"></NavigationItem>
            <NavigationItem imageUrl={recommendIcon} navTitle="추천 가맹점"></NavigationItem>
            <NavigationItem navTitle="리뷰 작성"></NavigationItem>
            <NavigationItem imageUrl={communityIcon} navTitle="커뮤니티"></NavigationItem>
            <NavigationItem onClick={() => {navigation('/mypage')}}  imageUrl={mypageIcon} navTitle="마이페이지"></NavigationItem>
        </NavigationFrame>
        

    )

}

export default Navigation;