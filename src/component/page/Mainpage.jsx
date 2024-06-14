import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";

//component
import Navigation from "../navigation/Navigation";
import Header from "../header/Header";
import FixedTop from "../header/FixedTop";
import CateGrid from "../list/CategorieGrid";

//styled
const Wrapper = styled.div`
    width:100%;
`
const Tag = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: #1C170D;
    margin-left:20px;
    margin-top: 20px;
`
function MainPage(props) {
    
    const navigation = useNavigate();

    const categoryLabel = ['한식', '중식', '일식', '양식', '패스트푸드', 
    '카페', '베이커리', '편의점/마트', '의료/보건', '미용/뷰티', 
    '학원/교육', '스포츠/헬스', '숙박업', '기타', '인테리어',
    '도서/문화', '의류/안경', '주유소', '산모/육아', '가전/통신',
    '시장/거리', '자동차/자전거', '부동산', '평생학습기관', '여성생필품'];

    return (

        <Wrapper>
            <FixedTop></FixedTop>
            <Header backLink="/" headerTitle="가맹점 찾기"></Header>
            <Tag>카테고리</Tag>
            <CateGrid categories={categoryLabel} onClickItem={() => {navigation('/category', {state:categoryLabel})}}></CateGrid>
            <Navigation></Navigation>
        </Wrapper>

    )

}

export default MainPage;