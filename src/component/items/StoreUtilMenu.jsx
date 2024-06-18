import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase.js";    // firebase 설정 가져오기

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

function StoreUtilMenu(props) {
    const { data, isBook, onLikeClick } = props;
    const [isFavoriteActive, setIsFavoriteActive] = useState(isBook);
    const [isLikeActive, setIsLikeActive] = useState(false);
    const navigate = useNavigate();
    const [bookMarkArray, setBookMarkArray] = useState([])

    useEffect(function () {
        db.collection('bookMarkStores').doc('bookMark').get().then(function (doc) {
            const tempQueData = doc.data();

            const bookArray = tempQueData.bookMarkArray || []; // 기본값으로 빈 배열 설정

            setBookMarkArray(bookArray);
        })
    }, [bookMarkArray]) // 빈 배열 꼭 추가


    const handleLikeClick = () => {
        setIsLikeActive(!isLikeActive);
        onLikeClick(isLikeActive); // 부모 컴포넌트에 상태 전달
    };


    const removeFromBookMarkArray = async (valueToRemove) => {
        try {
            // Firestore에서 기존 배열 가져오기
            const docRef = db.collection('bookMarkStores').doc('bookMark');
            const docSnapshot = await docRef.get();

            if (docSnapshot.exists) {
                const data = docSnapshot.data();
                const bookMarkArray = data.bookMarkArray;

                // 특정 값을 배열에서 제거
                const updatedArray = bookMarkArray.filter(item => item !== valueToRemove);

                // Firestore에 업데이트된 배열 저장
                await docRef.set({ bookMarkArray: updatedArray });

                // 상태 업데이트 (필요시)
                setIsFavoriteActive(!isFavoriteActive);
            } else {
                console.log('Document does not exist.');
            }
        } catch (error) {
            console.error('Error removing value from array: ', error);
        }
    };

    return (
        <Wrapper>
            <UtilContent onClick={function () {
                if (!isFavoriteActive) {
                    const addUpdatedArray = [...bookMarkArray, data.name + "_" + data.branchName];
                    db.collection('bookMarkStores').doc('bookMark').set({
                        bookMarkArray: addUpdatedArray
                    }).then(function () {
                        setIsFavoriteActive(!isFavoriteActive);
                    })
                }
                else {
                    const valueToRemove = data.name + "_" + data.branchName;
                    removeFromBookMarkArray(valueToRemove);
                }

            }}>
                <UtilIcon src={isFavoriteActive ? favoriteIcon : favoriteIconActive } />
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
