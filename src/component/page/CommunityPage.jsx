import React from "react";
import styled from "styled-components";

//component
import Navigation from "../navigation/Navigation";
import Header from "../header/Header";
import FixedTop from "../header/FixedTop";
import TextInput from "../ui/TextInput";
// import PostItem from "../items/PostItem";
// import PostList from "../list/PostList";

//styled

const Wrapper = styled.div`
    width:100%;
`

const SearchContainer = styled.div`
    padding: 12px 20px;
    height: 64px;
    width: 100%;
`

function CommunityPage(props) {

    return (

        <Wrapper>
            <FixedTop></FixedTop>
            <Header backLink="/" headerTitle="커뮤니티"></Header>
            <SearchContainer>
                <TextInput/>
            </SearchContainer>
            {/* <PostList></PostList> */}
            
            <Navigation></Navigation>
        </Wrapper>
    
    )

}

export default CommunityPage;