import React, { useState } from 'react';
import styled from 'styled-components';
import MyStoreItem from '../page/MyStoreItem';


const Wrapper = styled.div`
    width: 100%;
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-inline: 20px;
    padding-block: 12px;
    background-color: #FFFFFF;
    border-bottom: 2px solid #DFDFDF;
`;

const SGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`;



function MyStoreGrid(props){
    const { stores, onClickItem } = props;

    
    const storesList = ['뜨끈이감자탕', '생금마을', '카페39'];
    return (
        <Wrapper>
            <SGrid>
            {storesList.map((store, index) => (
                <MyStoreItem store={store}></MyStoreItem>
                ))}
            </SGrid>
        </Wrapper>
    );

}

export default MyStoreGrid;