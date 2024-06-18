import React from 'react'
import styled from "styled-components";

import CallUI from "../../images/callUI.png"
// import FixedTop from '../header/FixedTop';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    width: 100%;
    height:100vh;
`;

const CallContainer = styled.img`
    width:100%;
    height:100%;
    object-fit:cover;
`

function Call() {
    
    const navigate = useNavigate()

  return (
    <Wrapper onClick={() => navigate('/')}>

        {/* <FixedTop></FixedTop> */}
        <CallContainer src={CallUI}></CallContainer>
    </Wrapper>
  )
}

export default Call
