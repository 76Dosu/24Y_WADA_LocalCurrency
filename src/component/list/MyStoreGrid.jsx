import React from 'react';
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



function MyStoreGrid(props) {
    const { data, tabData, onClickItem } = props;
    return (
        <Wrapper>
            <SGrid>
                {data.map(item => (
                    <>
                        {item.stores && item.stores.map(store => (
                            <>
                                {tabData.includes(store.name + "_" + store.branchName) &&
                                    <>
                                        <StoreItem data={store} listType={'MY플레이스'} onClickItem={()=>onClickItem(store)}></StoreItem>
                                    </>
                                }
                            </>
                        ))}
                    </>
                ))}
            </SGrid>
        </Wrapper>
    );

}

export default MyStoreGrid;