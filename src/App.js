import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LoginScreen from './Components/LoginScreen';
import NewPostScreen from './Components/NewPostScreen';
import ReceiptsScreen from './Components/ReceiptsScreen';
import SignUpScreen from './Components/SignUpScreen';



export default function App () {



    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginScreen />} />
                <Route path="/sign-up" element={<SignUpScreen />} />
                <Route path="/receipts" element={<ReceiptsScreen />} />
                <Route path="/newpost" element={<NewPostScreen />} />
            </Routes>
        </BrowserRouter>
    )
}