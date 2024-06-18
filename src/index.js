import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

//component
import MainPage from "./component/page/Mainpage"
import WritePostPage from './component/page/WritePostPage';
import CommunityPage from './component/page/CommunityPage';
import MyPage from './component/page/MyPage';
import MyStorePage from './component/page/MyStorePage';
import PostDetailPage from './component/page/PostDetailPage';
import StoreDetailPage from './component/page/StoreDetailPage';
import FindStorePage from './component/page/FindStorePage';
import CategoryPage from './component/page/CategoryPage';
import PostSelectPage from './component/page/PostSelectPage';
import QrcodePage from './component/page/QrcodePage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
            <Route index element={<MainPage />}></Route>
            <Route path="category" element={<CategoryPage />}></Route>
            <Route path="write" element={<WritePostPage />}></Route>
            <Route path="select" element={<PostSelectPage />}></Route>
            <Route path="Qr" element={<QrcodePage />}></Route>
            <Route path="community" element={<CommunityPage />}></Route>
            <Route path="myPage" element={<MyPage />}></Route>
            <Route path="myStore" element={<MyStorePage />}></Route>
            <Route path="postDetail" element={<PostDetailPage />}></Route>
            <Route path="storeDetail" element={<StoreDetailPage />}></Route>
            <Route path="findStore" element={<FindStorePage />}></Route>
        </Routes>
    </BrowserRouter>
);