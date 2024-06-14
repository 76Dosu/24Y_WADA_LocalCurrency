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


function CateGrid(props) {

    const { categories, onClickItem } = props;

    
    return (
        <Wrapper>
            <KateGrid>
            {categories.map((label, index) => (
                <CategoryGridItem key={index} index={index} label={label} onClick={onClickItem}></CategoryGridItem>
                ))}
            </KateGrid>
        </Wrapper>
    );

}

export default CateGrid;