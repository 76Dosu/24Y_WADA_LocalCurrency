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
import writeIcon from "../../images/write.png"

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

const NavigationWrite = styled.div`
    width:48px;
    height:48px;
    background-color:#3182F7;
    border-radius:50px;

    display:flex;
    align-items: center;
    justify-content:center;
`

const WriteImage = styled.img`
    width:24px;
    height:24px;
`

function Navigation(props) {

    const navigation = useNavigate();

    return (

        <NavigationFrame>
            <NavigationItem onClick={() => {navigation('/')}} imageUrl={homeIcon} navTitle="홈"></NavigationItem>
            <NavigationItem imageUrl={recommendIcon} navTitle="추천 가맹점"></NavigationItem>
<<<<<<< HEAD
            <NavigationItem onClick={() => {navigation('/select')}} navTitle="리뷰 작성"></NavigationItem>
=======
            <NavigationWrite onClick={() => {navigation('/write')}}>
                <WriteImage src={writeIcon}></WriteImage>
            </NavigationWrite>
>>>>>>> 25bde5369f7b995973417a3e51f4ebea54e13b95
            <NavigationItem onClick={() => {navigation('/community')}} imageUrl={communityIcon} navTitle="커뮤니티"></NavigationItem>
            <NavigationItem onClick={() => {navigation('/myPage')}}  imageUrl={mypageIcon} navTitle="마이페이지"></NavigationItem>
        </NavigationFrame>
        

    )

}

export default Navigation;