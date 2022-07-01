import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LoginScreen from './Components/LoginScreen';
import NewPostScreen from './Components/NewPostScreen';
import ReceiptsScreen from './Components/ReceiptsScreen';
import SignUpScreen from './Components/SignUpScreen';
import TokenContext from './Contexts/TokenContext';
import NameContext from './Contexts/NameContext';


export default function App() {
    const [token, setToken] = useState("");
    const [name, setName] = useState("");


    return (
        <TokenContext.Provider value={{ token, setToken }} >
            <NameContext.Provider value={{ name, setName }} >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginScreen />} />
                        <Route path="/sign-up" element={<SignUpScreen />} />
                        <Route path="/receipts" element={<ReceiptsScreen />} />
                        <Route path="/newpost" element={<NewPostScreen />} />
                    </Routes>
                </BrowserRouter>
            </NameContext.Provider>
        </TokenContext.Provider>
    )
}