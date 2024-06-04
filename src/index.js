import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

//component
import MainPage from "../src/component/page/MainPage"
import MyPage from './component/page/MyPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
            <Route index element={<MainPage />}></Route>
            <Route path="mypage" element={<MyPage />}></Route>
        </Routes>
    </BrowserRouter>
);