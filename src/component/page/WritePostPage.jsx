import React, { useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

//component
import Header from "../header/Header";
import FixedTop from "../header/FixedTop";
import TextInputWrite from '../ui/TextInputWrite';
import Postbutton from '../ui/Postbutton';
import LocationInfo from "../items/LocationInfo";

import { useLocation } from "react-router-dom";

// Slider styles
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { db } from "../../firebase.js"    // firebase 설정 가져오기

const Wrapper = styled.div`
    width: 100%;
`;

const ContentArea = styled.div`
    width: 100%;
    height:calc(100vh - 178px);
    overflow: auto;
    padding: 0 20px;
`;

const ImageSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${({ hasImages }) => (hasImages ? "space-between" : "center")};
    width: 100%;
    height: 260px;
    margin-top: 16px;
    margin-bottom: 24px;
    position: relative; /* Ensure position relative for dot container */
`;

const SliderContainer = styled.div`
    width: 75%;
    height: 100%;
    display: ${({ hasImages }) => (hasImages ? "block" : "none")};
`;

const ImagePlusContainer = styled.div`
    width: ${({ hasImages }) => (hasImages ? "20%" : "100%")};
    height: 100%;
    background-color: #E8F2FB;
    border-radius: 14px;
    border: 2px dashed #3182F7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
`;

const HiddenFileInput = styled.input`
    display: none;
`;

const Imageguide = styled.div`
    display: ${({ hasImages }) => (hasImages ? "none" : "flex")};
    flex-direction: column;
    align-items: center;
`;

const PlusIcon = styled.span`
    font-size: 32px;
    color: #3192f7;
    display: block;
`;

// const LocationInfo = styled.div`
//     margin-bottom: 12px;
// `;

// const StoreName = styled.h4`
//     font-size: 18px;
//     margin-bottom: 6px;
//     font-weight: 300;
// `;

// const Address = styled.p`
//     font-size: 14px;
//     color: #3182F7;
//     display: flex;
//     align-items: center;
//     margin-left: -5px;
// `;

// const LocationIcon = styled.img`
//     width: 16px;
//     height: 16px;
//     object-fit: cover;
//     margin-right: 4px;
// `;

const ImageSlide = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 100%; 
    overflow: hidden;
    border-radius: 14px;
`;

const SlideImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Maintain aspect ratio */
    border-radius: 14px; /* Ensure rounded corners */
`;

const CustomDot = styled.ul`
    position: absolute;
    bottom:15px;
    left: 90%;
    transform: translateX(-50%);
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
`;

const Dot = styled.li`
    width: 10px !important; /* Adjust the width */
    height: 10px !important; /* Adjust the height */
    margin: 0 5px;
    background-color: ${({ active }) => (active ? "#3182F7" : "#C4C4C4")};
    border-radius: 50%;
    cursor: pointer;
`;

function CommunityPage(props) {
<<<<<<< HEAD
    const navigate = useNavigate()

=======
    const {state} = useLocation();
>>>>>>> bf5cf87a1aa1b6724cae8c719f3ca96dcab90533
    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleImageClick = () => {
        document.getElementById('imageUpload').click();
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const newImages = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
            setImages([...images, ...newImages]);
        }
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: dots => (
            <CustomDot>
                {dots.map((dot, index) => (
                    <Dot key={index} active={index === currentSlide} />
                ))}
            </CustomDot>
        ),
        afterChange: (index) => {
            setCurrentSlide(index); // Update current slide index
        }
    };

    // firebase 업로드
    const [title, setTitle] = useState('');
    const [content, setContents] = useState('');

    return (
        <Wrapper>
            <FixedTop />
            <Header backLink="/" headerTitle="포스팅" />
            <ContentArea>
                <ImageSection hasImages={images.length > 0}>
                    <SliderContainer hasImages={images.length > 0}>
                        <Slider {...settings}>
                            {images.map((image, index) => (
                                <ImageSlide key={index}>
                                    <SlideImage src={image} alt={`Selected ${index}`} />
                                </ImageSlide>
                            ))}
                        </Slider>
                    </SliderContainer>
                    <ImagePlusContainer hasImages={images.length > 0} onClick={handleImageClick}>
                        <HiddenFileInput 
                            id="imageUpload" 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                        />
                        <PlusIcon>+</PlusIcon>
                        <Imageguide hasImages={images.length > 0}>
                            {images.length === 0 && <p>이미지를 추가하세요</p>}
                        </Imageguide>
                    </ImagePlusContainer>
                </ImageSection>
<<<<<<< HEAD
                <LocationInfo>
                    <StoreName>뜨끈이감자탕</StoreName>
                    <Address>
                        <LocationIcon src={"/location.png"} />경기도 시흥시 정왕동
                    </Address>
=======
                <LocationInfo storeName={state[0]} address={state[1]} borderColor={"#fff"}>
                    {console.log("state")}
                    {console.log(state)}
>>>>>>> bf5cf87a1aa1b6724cae8c719f3ca96dcab90533
                </LocationInfo>
                <TextInputWrite
                    height={40}
                    fontSize={20}
                    placeholder="제목을 입력하세요"
                    value={title} onChange={(e) => setTitle(e.target.value)}
                />
                <TextInputWrite
                    height={200}
                    placeholder="내용을 입력하세요"
                    placeholderColor="#88888850"
                    placeholderFontSize="14px"
                    value={content} onChange={(e) => setContents(e.target.value)}
                />
                <Postbutton onClick={() => navigate("/postDetail")}title="포스트 작성하기"/>
            </ContentArea>
        </Wrapper>
    );
}

export default CommunityPage;
