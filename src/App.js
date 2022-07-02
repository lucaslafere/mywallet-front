import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LoginScreen from './Components/LoginScreen';
import NewPostScreen from './Components/NewCreditScreen';
import ReceiptsScreen from './Components/ReceiptsScreen';
import SignUpScreen from './Components/SignUpScreen';
import TokenContext from './Contexts/TokenContext';
import NameContext from './Contexts/NameContext';
import NewDebtScreen from './Components/NewDebtScreen';
import NewCreditScreen from './Components/NewCreditScreen';


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
                        <Route path="/new-credit" element={<NewCreditScreen />} />
                        <Route path="/new-debt" element={<NewDebtScreen />} />
                    </Routes>
                </BrowserRouter>
            </NameContext.Provider>
        </TokenContext.Provider>
    )
}