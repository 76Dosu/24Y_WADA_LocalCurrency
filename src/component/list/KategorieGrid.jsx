import React, { useState } from 'react';
import styled from 'styled-components';

const KateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
`;


const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function KateGrid(props){
    const { posts, onClickItem } = props;


    return (
        <Wrapper>
            {posts.map((post, index)=>{
                return(
                    <PostItem key={post.id} post={post} onClick={()=>onClickItem(post)}></PostItem>
                )
            })}
        </Wrapper>
    );

}

export default KateGrid;