import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//component
import Header from "../header/Header";
import FixedTop from "../header/FixedTop";
import TextInputWrite from '../ui/TextInputWrite';
import Postbutton from '../ui/Postbutton';
import LocationInfo from "../items/LocationInfo";

import { useLocation, useNavigate } from "react-router-dom";

// Slider styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import { db } from "../../firebase.js"    // firebase 설정 가져오기

const Wrapper = styled.div`
    width: 100%;
    height: calc(100vh - 103px - 114px);
    margin-top:103px;
`;

const ContentArea = styled.div`
    width: 100%;
    height: 100%;
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
    height:100%;
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
    const { state } = useLocation();
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);

    const navigate = useNavigate();

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

    const [storeData, setStoreData] = useState(null);
    const storeName = state[0]; // 찾아야 할 store ID

    useEffect(() => {
        const findStoreByName = async (storeName) => {
            const collectionName = 'dummyData';

            try {
                // Get the top-level collection 'dummyData2'
                const snapshot = await db.collection(collectionName).get();

                for (const doc of snapshot.docs) {
                    // Get 'store' subcollection for each document
                    const storeSnapshot = await db.collection(collectionName).doc(doc.id).collection('store').get();

                    for (const storeDoc of storeSnapshot.docs) {
                        if (storeDoc.data().name === storeName) {
                            // Store found, get the store document data
                            let storeData = { id: storeDoc.id, ...storeDoc.data() };

                            console.log("storeData2222222222")
                            console.log(storeData)
                            // Add parent document ID
                            storeData.parentDocId = doc.id;

                            console.log("doc.id22222222222222")
                            console.log(doc.id)
                            // Get 'menu' subcollection for this 'store' document
                            const menuSnapshot = await db.collection(collectionName).doc(doc.id)
                                .collection('store').doc(storeDoc.id).collection('menu').get();
                            let menus = [];
                            for (const menuDoc of menuSnapshot.docs) {
                                menus.push({ id: menuDoc.id, ...menuDoc.data() });
                            }
                            storeData.menus = menus;

                            // Get 'post' subcollection for this 'store' document
                            const postSnapshot = await db.collection(collectionName).doc(doc.id)
                                .collection('store').doc(storeDoc.id).collection('post').get();
                            let posts = [];
                            for (const postDoc of postSnapshot.docs) {
                                posts.push({ id: postDoc.id, ...postDoc.data() });
                            }
                            storeData.posts = posts;

                            // Return store data with all subcollections
                            return storeData;
                        }
                    }
                }
                return null; // Store not found
            } catch (error) {
                console.error("Error finding store by name: ", error);
                return null;
            }
        };

        const fetchStoreData = async () => {
            const data = await findStoreByName(storeName);
            setStoreData(data);
        };

        fetchStoreData();

    }, [storeName]);

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
                <LocationInfo storeName={state[0]} address={state[1]} borderColor={"#fff"}>
                    {console.log("state")}
                    {console.log(state)}
                </LocationInfo>
                <TextInputWrite
                    height={40}
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextInputWrite
                    height={200}
                    placeholder="내용을 입력하세요"
                    placeholderColor="#88888850"
                    placeholderFontSize="14px"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <Postbutton onClick={function () {
                    console.log("storeData5555555555555555555555555555555555555555555555")
                    console.log(images.length === 0)
                    if (images.length >= 1 && title !== "" && content !== "") {
                        let timeTemp = new Date();
                        let timeStamp = timeTemp.getTime().toString();
                        let year = timeTemp.getFullYear();
                        let month = timeTemp.getMonth() + 1;
                        let day = timeTemp.getDate();
                        // console.log(year+"년"+month+"월"+day+"일")
                        db.collection('dummyData').doc(storeData.parentDocId).collection('store').doc(storeData.id).collection('post').doc(timeStamp).set({
                            id: timeStamp,
                            year: year,
                            month: month,
                            day: day,
                            title: title,
                            content: content,
                            comments: [],
                            like: 0,
                            postImage: images,
                            storeId: "가맹점Id"
                        }).then(function () {
                            navigate(`/community`)
                        })
                    }
                    else {
                        toast.warn("이미지를 추가하고 제목과 내용을 입력해주세요.");
                    }

                }} title="포스트 작성하기" />
                <ToastContainer />
            </ContentArea>
        </Wrapper>
    );
}

export default CommunityPage;
