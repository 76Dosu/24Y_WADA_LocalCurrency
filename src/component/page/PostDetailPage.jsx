// PostDetailPage.jsx 파일
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import { db } from "../../firebase.js"; // firebase 설정 가져오기
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

// component
import Navigation from "../navigation/Navigation";
import FixedTop from "../header/FixedTop";
import Header from "../header/Header";
import UtilFrame from "../items/PostUtilFrame";
import PostContent from "../items/PostContent";
import TextInput from "../ui/TextInput";
import CommentList from "../list/CommentList";
import Button from "../ui/Button";

// image
import sendIcon from "../../images/send.png";

// styled components
const Wrapper = styled.div`
        width: 100%;
        height: calc(100vh - 103px - 114px);
        margin: 103px 0 114px 0;
        overflow: scroll;
    `;

const ContentArea = styled.div`
        width: 100%;
        padding: 0px 20px;
    `;

const PostTitle = styled.p`
        margin: 20px 0px 12px 0px;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 12px;
    `;

const LocationInfo = styled.div`
        margin-bottom: 12px;
        background-color: #e8f2fb;
        width: fit-content;
        padding: 8px 16px 8px 8px;
        border-radius: 50px;
    `;

const Address = styled.p`
        font-size: 14px;
        color: #333;
        display: flex;
        align-items: center;
    `;

const LocationIcon = styled.img`
        width: 16px;
        height: 16px;
        object-fit: cover;
        margin-right: 4px;
    `;

const PostRepresentImage = styled.img`
        width: 100%;
        border-radius: 14px;
    `;

const PostContentFrame = styled.div`
        margin-top: 24px;
        padding-bottom: 16px;
        border-bottom: 1px solid #dfdfdf;
    `;

// Comment
const CommentArea = styled.div`
        width: 100%;
        padding: 20px;
    `;

const UploadComment = styled.div`
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    `;
const SliderContainer = styled.div`
        width: 100%;
        height: 100%;
        display: ${({ hasImages }) => (hasImages ? "block" : "none")};
    `;

const ImagePlusContainer = styled.div`
        width: ${({ hasImages }) => (hasImages ? "20%" : "100%")};
        height: 100%;
        background-color: #e8f2fb;
        border-radius: 14px;
        border: 2px dashed #3182f7;
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
        height: 100%;
        object-fit: cover; /* Maintain aspect ratio */
        border-radius: 14px; /* Ensure rounded corners */
    `;

const CustomDot = styled.ul`
        position: absolute;
        bottom: 15px;
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
        background-color: ${({ active }) => (active ? "#3182f7" : "#c4c4c4")};
        border-radius: 50%;
        cursor: pointer;
    `;

const DateText = styled.p`
        font-size: 12px;
        font-weight: bold;
        color: #666666;
        margin-bottom: 20px;
    `;

function PostDetailPage(props) {
    const { state } = useLocation();
    const navigation = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const [storeData, setStoreData] = useState(null);
    const [comment, setComment] = useState(null);
    const postIdToFind = state.id; // 찾아야 할 post의 ID

    useEffect(() => {
        const findStoreByPostId = async (postId) => {
            const collectionName = "dummyData";

            try {
                // Get the top-level collection 'dummyData2'
                const snapshot = await db.collection(collectionName).get();

                for (const doc of snapshot.docs) {
                    // Get 'store' subcollection for each document
                    const storeSnapshot = await db
                        .collection(collectionName)
                        .doc(doc.id)
                        .collection("store")
                        .get();

                    for (const storeDoc of storeSnapshot.docs) {
                        // Get 'post' subcollection for each 'store' document
                        const postSnapshot = await db
                            .collection(collectionName)
                            .doc(doc.id)
                            .collection("store")
                            .doc(storeDoc.id)
                            .collection("post")
                            .where("id", "==", postId)
                            .get();

                        if (!postSnapshot.empty) {
                            // Post found, get the store document data
                            let storeData = { id: storeDoc.id, ...storeDoc.data() };

                            // Add parent document ID
                            storeData.parentDocId = doc.id;

                            // Get 'menu' subcollection for this 'store' document
                            const menuSnapshot = await db
                                .collection(collectionName)
                                .doc(doc.id)
                                .collection("store")
                                .doc(storeDoc.id)
                                .collection("menu")
                                .get();
                            let menus = [];
                            for (const menuDoc of menuSnapshot.docs) {
                                menus.push({ id: menuDoc.id, ...menuDoc.data() });
                            }
                            storeData.menus = menus;

                            // Get 'post' subcollection for this 'store' document
                            const postCollectionSnapshot = await db
                                .collection(collectionName)
                                .doc(doc.id)
                                .collection("store")
                                .doc(storeDoc.id)
                                .collection("post")
                                .get();
                            let posts = [];
                            for (const postDoc of postCollectionSnapshot.docs) {
                                posts.push({ id: postDoc.id, ...postDoc.data() });
                            }
                            storeData.posts = posts;

                            // Return store data with all subcollections
                            return storeData;
                        }
                    }
                }
                return null; // Post not found
            } catch (error) {
                console.error("Error finding store by post ID: ", error);
                return null;
            }
        };

        const fetchStoreData = async () => {
            const data = await findStoreByPostId(postIdToFind);
            setStoreData(data);
        };

        fetchStoreData();
    }, [postIdToFind]);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: (dots) => (
            <CustomDot>
                {dots.map((dot, index) => (
                    <Dot key={index} active={index === currentSlide} />
                ))}
            </CustomDot>
        ),
        afterChange: (index) => {
            setCurrentSlide(index); // Update current slide index
        },
    };

    return (
        <Wrapper>
            <FixedTop />
            <Header backLink={-1} headerTitle="포스팅" />

            <ContentArea>
                {/* Title */}
                <PostTitle>{state.title}</PostTitle>

                {state.month < 10 &&
                    <>
                        <DateText>
                            {state.year}.0{state.month}.{state.day}
                        </DateText>
                    </>
                }
                {state.month >= 10 &&
                    <>
                        <DateText>
                            {state.year}.{state.month}.{state.day}
                        </DateText>
                    </>
                }
                <LocationInfo
                    onClick={function () {
                        navigation("/store/" + storeData.id, { state: [storeData, 0] });
                    }}
                >
                    {storeData ? (
                        <Address>
                            <LocationIcon src={"/location.png"} />
                            {storeData.name || ""}_{storeData.branchName || ""}
                        </Address>
                    ) : (
                        <Address>
                            <LocationIcon src={"/location.png"} />
                            loading...
                        </Address>
                    )}
                </LocationInfo>

                {/* Image */}
                {typeof state.postImage === "string" && (
                    <PostRepresentImage src={state.postImage}></PostRepresentImage>
                )}
                {Array.isArray(state.postImage) && (
                    // <PostRepresentImage src={state.postImage[0]}></PostRepresentImage>
                    <SliderContainer hasImages={state.postImage.length > 0}>
                        <Slider {...settings}>
                            {state.postImage.map((image, index) => (
                                <ImageSlide key={index}>
                                    <SlideImage src={image} alt={`Selected ${index}`} />
                                </ImageSlide>
                            ))}
                        </Slider>
                    </SliderContainer>
                )}

                {/* UtilFrame */}
                <UtilFrame likes={state.like} comments={state.comments.length} />

                <PostContentFrame>
                    <PostContent contents={state.content}></PostContent>
                </PostContentFrame>
            </ContentArea>

            <CommentArea>
                <CommentList comments={state.comments} postInfo={state}></CommentList>

                <UploadComment>
                    <TextInput
                        placeholder="댓글을 입력하세요."
                        width="80%"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    ></TextInput>
                    <Button
                        icon={sendIcon}
                        onClick={function () {
                            let timeTemp = new Date();
                            let timeStamp = timeTemp.getTime().toString();
                            let tempComments = state.comments;
                            tempComments.push({
                                id: state.id + "_" + timeStamp,
                                content: comment,
                            });

                            db.collection("dummyData")
                                .doc(storeData.parentDocId)
                                .collection("store")
                                .doc(storeData.id)
                                .collection("post")
                                .doc(state.id)
                                .update({
                                    comments: tempComments,
                                })
                                .then(function () {
                                    setComment("");
                                });
                        }}
                    ></Button>
                </UploadComment>
            </CommentArea>

            <Navigation></Navigation>
        </Wrapper>
    );
}

export default PostDetailPage;
