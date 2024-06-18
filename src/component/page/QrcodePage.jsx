import React from 'react'
import styled from "styled-components";

import Header from "../header/Header";
import FixedTop from "../header/FixedTop";
import Navigation from '../navigation/Navigation';


const Wrapper = styled.div`
    width: 100%;
`;

const ContentArea = styled.div`
    width: 100%;
    margin-top:103px;
    height: calc(100vh - 103px - 114px);
    overflow: auto;
    padding: 0 20px;
    background-image: url("/Qr.png");
    background-size: cover;
    filter: brightness(30%);
`;

const Qrbox=styled.div`
    width: 350px;
    height: 350px;
    /* margin-top: 100px; */
    border: 3px solid skyblue;
    border-radius: 20px;
    background-image: url("/Qr.png");
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    top: 200px;
    background-position: -40px -120px;
    background-size: 120%;
    filter: brightness(120%);
`

const Howuse=styled.div`
    width: 100%;
    height: 120px;
    background-color: #ffffff;
    border-radius: 20px 20px 0 0;
    position: absolute;
    bottom: 0;
`
const HowuseHandle= styled.div`
    width: 45px;
    height: 5px;
    border-radius: 5px;
    background-color: gray;
    margin: 10px auto;
`
const HowuseText= styled.h3`
    text-align: center;
    margin: 40px auto;
    font-size: 20px;
`
const QrInfo=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* padding-top: 500px; */
    bottom: 160px;
    width: 240px;
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
`
const WhereQr=styled.p`
    color: #fff;
    margin-bottom: 4px;
`
const UseQr=styled.h2`
    color: #fff;
`

function QrcodePage() {
  return (
    <Wrapper>
        <FixedTop />
        <Header backLink="/" headerTitle="QR 결제" />
        
        <ContentArea></ContentArea>
    
        <Qrbox></Qrbox>
        <QrInfo>
            <WhereQr>음식점·편의점·병원 등 어디서든</WhereQr>
            <UseQr>QR코드를 스캔하세요</UseQr>
       </QrInfo>
        
        <Navigation></Navigation>

        </Wrapper>
  )
}

export default QrcodePage
