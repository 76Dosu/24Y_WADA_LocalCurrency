import React, { useState } from 'react';
import styled from 'styled-components';
import StoreItem from '../items/StoreItem';


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
            {stores.map((store, index) => (
                <StoreItem key={index} listType={'나의가맹점'} store={store}></StoreItem>
                ))}
            </SGrid>
        </Wrapper>
    );

}

export default MyStoreGrid;