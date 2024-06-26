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
import CategoryPage from './component/page/CategoryPage';
import PostSelectPage from './component/page/PostSelectPage';
import QrcodePage from './component/page/QrcodePage';
import Call from './component/page/Call';

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
            <Route path="post/:id" element={<PostDetailPage />}></Route>
            <Route path="store/:id" element={<StoreDetailPage />}></Route>

            <Route path="call" element={<Call />}></Route>
        </Routes>
    </BrowserRouter>
);