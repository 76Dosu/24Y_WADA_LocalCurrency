import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import { db } from "../../firebase.js"    // firebase 설정 가져오기
import { useNavigate } from "react-router-dom";


//component
import Navigation from "../navigation/Navigation";
import FixedTop from "../header/FixedTop";
import Header from "../header/Header";
import UtilFrame from "../items/PostUtilFrame";
import PostContent from "../items/PostContent";
import TextInput from "../ui/TextInput";
import CommentList from "../list/CommentList";
import Button from "../ui/Button";

//image
import RepresentImage from "../../images/testImage.png"
import { useLocation } from "react-router-dom";

//styled
const Wrapper = styled.div`
    width:100%;
    height:calc(100vh - 116px);
    overflow: scroll;
`

const ContentArea = styled.div`
    width:100%;
    padding:0px 20px;
`

const PostTitle = styled.p`
    margin:20px 0px 12px 0px;
    font-size:24px;
    font-weight:bold;
    margin-bottom:12px;
`

const LocationInfo = styled.div`
    margin-bottom: 12px;
    background-color:#E8F2FB;
    width:fit-content;
    padding:8px 16px 8px 8px;
    border-radius:50px;
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
    width:100%;
`

const PostContentFrame = styled.div`
    margin-top:24px;
    padding-bottom:16px;
    border-bottom:1px solid #dfdfdf;
`

// Comment
const CommentArea = styled.div`
    width:100%;
    padding:20px;
`

const UploadComment = styled.div`
    width:100%;
    display:flex;
    align-items: center;
    justify-content: space-between;

    
`

function PostDetailPage(props) {

    const { state } = useLocation();
    const navigation = useNavigate();

    const [storeData, setStoreData] = useState(null);
    const postIdToFind = state.id; // 찾아야 할 post의 ID

    useEffect(() => {
        const findStoreByPostId = async (postId) => {
            const collectionName = 'dummyData2';

            try {
                // Get the top-level collection 'dummyData2'
                const snapshot = await db.collection(collectionName).get();

                for (const doc of snapshot.docs) {
                    // Get 'store' subcollection for each document
                    const storeSnapshot = await db.collection(collectionName).doc(doc.id).collection('store').get();

                    for (const storeDoc of storeSnapshot.docs) {
                        // Get 'post' subcollection for each 'store' document
                        const postSnapshot = await db.collection(collectionName).doc(doc.id)
                            .collection('store').doc(storeDoc.id).collection('post').where('id', '==', postId).get();

                        if (!postSnapshot.empty) {
                            // Post found, return the store document data
                            return { id: storeDoc.id, ...storeDoc.data() };
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
    }, []);

    return (

        <Wrapper>
            <FixedTop />
            <Header backLink="/community" headerTitle="글 쓴거 제목" />

            <ContentArea>

                {/* Title */}
                <PostTitle>{state.title}</PostTitle>
                <LocationInfo onClick={function () {
                    navigation('/store/' + storeData.id, { state: storeData })
                }}>
                    {storeData ? (
                        <Address><LocationIcon src={"/location.png"} />{storeData.name || ""}_{storeData.branchName || ""}</Address>
                    ) : (
                        <Address><LocationIcon src={"/location.png"} />loading...</Address>
                    )}
                    
                </LocationInfo>

                {/* Image */}
                <PostRepresentImage src={state.postImage}></PostRepresentImage>

                {/* UtilFrame */}
                <UtilFrame />

                <PostContentFrame>
                    <PostContent contents={state.content}></PostContent>
                </PostContentFrame>
            </ContentArea>

            <CommentArea>
                <CommentList></CommentList>

                <UploadComment>
                    <TextInput placeholder="댓글을 입력하세요." width="80%" onChange={(e) => setComment(e.target.value)} value={comment}></TextInput>
                    <Button title="등록"></Button>
                </UploadComment>
                
            </CommentArea>
            
            <Navigation></Navigation>
        </Wrapper>

    )

}

export default PostDetailPage;