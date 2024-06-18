import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//images
import backIcon from "../../images/back.png";

//style
const Wrapper = styled.div`
    width: 100%;
    padding: 20px 16px;
    background: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);

    display: flex;
    align-items: center;

    position: fixed;
    top: 43px;
    left: 0;
    z-index: 1;
`;

const BackIcon = styled.img`
    width: 16px;
    height: 16px;
    margin-right: 16px;
    cursor: pointer; // 추가: 클릭할 수 있는 포인터 커서
`;

const HeaderTitleText = styled.p`
    font-size: 16px;
    font-weight: 500;
    color: var(--main-textColor);
`;

function Header(props) {
    const navigate = useNavigate();
    const { backLink } = props;

    const handleBackClick = () => {
        if (backLink === -1) {
            navigate(-1);
        } else {
            navigate(backLink);
        }
    };

    return (
        <Wrapper>
            <BackIcon onClick={handleBackClick} src={backIcon}></BackIcon>
            <HeaderTitleText>{props.headerTitle}</HeaderTitleText>
        </Wrapper>
    );
}

export default Header;
