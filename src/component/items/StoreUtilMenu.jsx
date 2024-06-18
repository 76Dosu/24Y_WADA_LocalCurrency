import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 이미지 임포트
import favoriteIcon from "../../images/favorite.png";
import favoriteIconActive from "../../images/favorite_active.png";
import likeIcon from "../../images/likeF.png";
import likeIconActive from "../../images/likeF_active.png";
import callIcon from "../../images/call.png";
import mapIcon from "../../images/map.png";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
`;

const UtilContent = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const UtilIcon = styled.img`
    width: 32px;
    margin-bottom: 4px;
`;

const UtilText = styled.p`
    font-size: 14px;
    color: #555;
`;

function StoreUtilMenu({ onLikeClick }) {
    const [isFavoriteActive, setIsFavoriteActive] = useState(false);
    const [isLikeActive, setIsLikeActive] = useState(false);
    const navigate = useNavigate();

    const handleFavoriteClick = () => {
        setIsFavoriteActive(!isFavoriteActive);
    };

    const handleLikeClick = () => {
        setIsLikeActive(!isLikeActive);
        onLikeClick(isLikeActive); // 부모 컴포넌트에 상태 전달
    };

    return (
        <Wrapper>
            <UtilContent onClick={handleFavoriteClick}>
                <UtilIcon src={isFavoriteActive ? favoriteIcon : favoriteIconActive} />
                <UtilText>즐겨찾기</UtilText>
            </UtilContent>
            <UtilContent onClick={handleLikeClick}>
                <UtilIcon src={isLikeActive ? likeIconActive : likeIcon} />
                <UtilText>좋아요</UtilText>
            </UtilContent>
            <UtilContent onClick={() => navigate('/call')}>
                <UtilIcon src={callIcon} />
                <UtilText>예약/전화</UtilText>
            </UtilContent>
            <UtilContent>
                <UtilIcon src={mapIcon} />
                <UtilText>길찾기</UtilText>
            </UtilContent>
        </Wrapper>
    );
}

export default StoreUtilMenu;
