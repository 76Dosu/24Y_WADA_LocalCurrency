import React from "react";
import styled from "styled-components";

//component
import Navigation from "../navigation/Navigation";
import FixedTop from "../header/FixedTop";
import Header from "../header/Header";
import UtilFrame from "../items/PostUtilFrame";
import PostContent from "../items/PostContent";

//image
import RepresentImage from "../../images/testImage.png"

//styled
const Wrapper = styled.div`
    width:100%;
`

const ContentArea = styled.div`
    width:100%;
`

const PostTitle = styled.p`
    padding:20px;
    font-size:24px;
    font-weight:bold;
    margin-bottom:12px;
`

const LocationInfo = styled.div`
    margin-bottom: 12px;
    background-color:#E8F2FB;
    width:fit-content;
    padding:8px 16px 8px 8px;
    border-radius:50px;
`;

const Address = styled.p`
    font-size: 14px;
    color: #333;
    display: flex;
    align-items: center;
`;

const LocationIcon = styled.img`
    width: 16px;
    height: 16px;
    object-fit: cover;
    margin-right: 4px;
`;

const PostRepresentImage = styled.img`
    width:100%;
`

const PostContentFrame = styled.div`
    margin-top:24px;
    padding-bottom:16px;
    border-bottom:1px solid #dfdfdf;
`

function PostDetailPage(props) {

    return (

        <Wrapper>
            <FixedTop />
            <Header backLink="/community" headerTitle="글 쓴거 제목" />

            <ContentArea>
                
                {/* Title */}
                <PostTitle>뜨거운감자탕 개꿀맛쓰</PostTitle>
                <LocationInfo>
                    <Address><LocationIcon src={"/location.png"} />뜨끈이감자탕 시화이마트점</Address>
                </LocationInfo>

                {/* Image */}
                <PostRepresentImage src={RepresentImage}></PostRepresentImage>

                {/* UtilFrame */}
                <UtilFrame/>

                <PostContentFrame>
                    <PostContent contents="오늘은 뜨끈이 감자탕에 갔다. 맛있었다."></PostContent>
                </PostContentFrame>
            </ContentArea>

            <Navigation></Navigation>
        </Wrapper>
    
    )

}

export default PostDetailPage;