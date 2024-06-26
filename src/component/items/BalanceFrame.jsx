import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// compotents
import Button from "../ui/Button";

// image
import BalanceImage from "../../images/balanceIcon.png"

// styled
const Balance = styled.div`
    width:100%;
    padding:16px 20px;
`

const TitleFrame = styled.div`
    width:100%;
    display:flex;
    align-items:center;
`

const BalanceIcon = styled.img`
    width:28px;
    height:28px;
`

const BalanceTitle = styled.p`
    width:100%;
    font-size:16px;
    color:#000;
    font-weight:400;
    margin-left:4px;
`

const BalanceUtilFrame = styled.div`
    width:fit-content;
    display:flex;
    flex-direction:column;

    cursor:pointer;
`

const UtilSpan = styled.div`
    width:4px;
    height:4px;
    background-color:#000;
    border-radius:10px;
    margin-bottom:4px;
    margin-left:auto;

    &:last-child {
        margin-bottom:0px;
    }
`

const CurrencyBalance = styled.p`
    width:100%;
    font-size:24px;
    font-weight:600;
    color:#000;
`

const ButtonFrame = styled.div`
    display:flex;
    justify-content: flex-end;
    gap:12px;
    align-items: center;

    margin-top:20px;
`

const Advantage=styled.img`
    width: 140px;
        height: 28px;
    
`

function BalanceFrame(props){

    const navigate = useNavigate()
    const [costs, setCosts] = useState(640000);

    const IncreaseCosts = () => {
        setCosts(costs + 30000)
    }

    return (

        <Balance>
            
            <TitleFrame>
                <BalanceIcon src={BalanceImage}></BalanceIcon>
                <BalanceTitle>시흥화폐 시루</BalanceTitle>

                <BalanceUtilFrame>
                    <UtilSpan></UtilSpan>
                    <UtilSpan></UtilSpan>
                    <UtilSpan></UtilSpan>
                </BalanceUtilFrame>
            </TitleFrame>
            
            <CurrencyBalance>{costs.toLocaleString()}원</CurrencyBalance>
           
            <ButtonFrame>
            <Advantage src={"/advantage.png"} ></Advantage>
                <Button onClick={IncreaseCosts} background="white" color="#3182F7" width="24%" title="충전"></Button>
                <Button onClick={() => navigate("/Qr")} width="24%" title="결제"></Button>
            </ButtonFrame>
            
        </Balance>

    )
}

export default BalanceFrame;
