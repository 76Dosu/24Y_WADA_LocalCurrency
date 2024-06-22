import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// component
import Navigation from "../navigation/Navigation";
import SearchHeader from "../header/SearchHeader.jsx";
import FixedTop from "../header/FixedTop";
import CateGrid from "../list/CateGrid";
import DividedDiv from "../ui/DividedDiv.jsx";
import BalanceFrame from "../items/BalanceFrame.jsx";

// image
import BannerImage1 from "../../images/main-banner.png";
import BannerImage2 from "../../images/main-banner2.png";
import BannerImage3 from "../../images/main-banner3.png";

// styled components
const Wrapper = styled.div`
    width: 100%;
    height: calc(100vh - 103px - 114px);
    margin-top: 103px;
    margin-bottom:114px;
    overflow: scroll;
`;

const Tag = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: #1c170d;
    margin-left: 20px;
    margin-top: 20px;
`;

const Banner = styled.div`
    width: 100%;
    padding: 16px 20px;
    background-color: white;
`;

const BannerImg = styled.img`
    width: 100%;
`;

function MainPage(props) {
    const navigation = useNavigate();
    const categoryLabel = [
        "한식", "중식", "일식", "양식", "패스트푸드",
        "카페", "베이커리", "편의점/마트", "의료/보건", "학원/교육",
        "스포츠/헬스", "도서/문화", "시장/거리", "자동차", "부동산"
    ];

    const bannerImages = [BannerImage1, BannerImage2, BannerImage3];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
        }, 2200);

        return () => clearInterval(timer);
    }, [bannerImages.length]);

    return (
        <Wrapper>
            <FixedTop />
            <SearchHeader backLink="/" headerTitle=""></SearchHeader>

            {/* 광고 배너 */}
            <Banner>
                <BannerImg src={bannerImages[currentImageIndex]} alt="Banner" />
            </Banner>
            <DividedDiv />

            {/* 현재 잔액 표시 */}
            <BalanceFrame />
            <DividedDiv />

            <Tag>카테고리</Tag>
            <CateGrid 
                categories={categoryLabel} 
                onClickItem={(p) => navigation('/category', { state: p })}
            />
            <DividedDiv />

            <Navigation />
        </Wrapper>
    );
}

export default MainPage;
