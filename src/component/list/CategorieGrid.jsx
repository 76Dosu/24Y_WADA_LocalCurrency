import React, { useState } from 'react';
import styled from 'styled-components';
import CategoryGridItem from '../items/CategoryGridItem';

//styled

const Wrapper = styled.div`
    width: 100%;
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-inline: 20px;
    padding-block: 12px;
    background-color: #FFFFFF;
`;

const KateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
`
const categoryLabel = ['한식', '중식', '일식', '양식', '패스트푸드', 
'카페', '베이커리', '편의점/마트', '의료/보건', '미용/뷰티', 
'학원/교육', '스포츠/헬스', '숙박업', '기타', '인테리어',
'도서/문화', '의류/안경', '주유소', '산모/육아', '가전/통신',
'시장/거리', '자동차/자전거', '부동산', '평생학습기관', '여성생필품'];

function CateGrid(props) {

    const { stores, onClickItem } = props;

    
    return (
        <Wrapper>
            <KateGrid>
            {categoryLabel.map((label, index) => (
                <CategoryGridItem index={index} label={label}></CategoryGridItem>
                ))}
            </KateGrid>
        </Wrapper>
    );

}

export default CateGrid;