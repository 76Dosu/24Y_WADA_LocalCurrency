import React from "react";
import styled from "styled-components";
import PostItem from "../items/PostItem";

const Wrapper = styled.div`
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background-color: #F2F2F2;
`

function PostList(props) {

    const { storePosts, posts, onClickItem } = props;

    const postData = [];


    if (posts && Object.keys(posts).length > 0) {
        posts.map((item) => (
            <>
                {item.stores && item.stores.map(store => (
                    <>
                        {store.posts && store.posts.map(post => (
                            <>
                                {postData.push(post)}
                            </>
                        ))}
                    </>
                ))}
            </>
        ))
    }
    {console.log("storePosts==================================================")}
    {console.log(storePosts)}

    return (
        <Wrapper>
            {storePosts
                ?
                <>
                    {storePosts.map((post, index) => {
                        return (
                            <PostItem key={post.id} post={post} onClick={() => onClickItem(post)}></PostItem>
                        )
                    })}
                </>
                :
                <>
                    {postData.map((post, index) => {
                        return (
                            <PostItem key={post.id} post={post} onClick={() => onClickItem(post)}></PostItem>
                        )
                    })}
                </>
            }

            

        </Wrapper>
    );

}

export default PostList;