import React from "react";
import styled from "styled-components";

//component

//image
import favoriteIcon from "../../images/favorite.png"
import likeIcon from "../../images/likeF.png"
import callIcon from "../../images/call.png"
import mapIcon from "../../images/map.png"

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom:16px;
`;

const UtilContent = styled.div`
    width:fit-content;

    display:flex;
    flex-direction: column;
    align-items:center;
`

const UtilIcon = styled.img`
    width:32px;
    margin-bottom:4px;
`

const UtilText = styled.p`
    font-size:14px;
    color:#555;
`

function StoreUtilMenu(props){
    
    const { onClick} = props;

    return (
        
        <Wrapper >

            <UtilContent>
                <UtilIcon src={favoriteIcon}></UtilIcon>
                <UtilText>즐겨찾기</UtilText>
            </UtilContent>
            <UtilContent>
                <UtilIcon src={likeIcon}></UtilIcon>
                <UtilText>좋아요</UtilText>
            </UtilContent>
            <UtilContent>
                <UtilIcon src={callIcon}></UtilIcon>
                <UtilText>예약/전화</UtilText>
            </UtilContent>
            <UtilContent>
                <UtilIcon src={mapIcon}></UtilIcon>
                <UtilText>길찾기</UtilText>
            </UtilContent>

        </Wrapper>
    )
}

export default StoreUtilMenu;
