import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';
import TokenContext from '../Contexts/TokenContext';

export default function LoginScreen() {
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const URL = "https://my-wallet-lucaslafere.herokuapp.com/login";
    const navigate = useNavigate();

    const { setToken } = useContext(TokenContext);

    const body = {
        email,
        password
    }

    function login(event) {
        event.preventDefault();
        setDisabled(true);
        setLoading(true);
        requestLogin();

    }

    function requestLogin() {
        axios.post(URL, body)
            .then((res) => {
                setToken(res.data.token);
                setLoading(false);
                navigate("/receipts");
            })
            .catch(err => {
                alert(err);
                setDisabled(false);
                setLoading(false);
            })
    }

    return (
        <Container>
            <MyWallet>
                <h1>MyWallet</h1>
            </MyWallet>
            <Form onSubmit={login} >
                <Input
                    placeholder="E-mail" type="email" autoComplete="email" disabled={disabled} value={email} onChange={e => setEmail(e.target.value)} />
                <Input
                    placeholder="Senha" type="password" autoComplete="current-password" disabled={disabled} value={password} onChange={e => setPassword(e.target.value)} />
                <Button
                    disabled={disabled}
                    type="submit" >
                    {loading ? <ThreeDots color="#fff" height={80} width={80} /> : "Entrar"}
                </Button>
            </Form>
            <Link to={"/sign-up"}>
                <TextLink>Primeira vez? Cadastre-se!</TextLink>
            </Link>
        </Container>
    )



}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
height: 100vh;
background-color: #8C12BE;
`
const MyWallet = styled.div`
margin-bottom: 2rem;
font-family: 'Saira Stencil One', cursive;
font-style: Regular;
font-size: 32px;
color: #FFF;
`
const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
gap: 0.8rem;
margin-bottom: 2rem;
`
const Input = styled.input`
display: flex;
align-items: center;
width: 90%;
height: 58px;
border-radius: 6px;
border: ${props => props.disabled ? "1px solid #d69bef" : "1px solid #FFF"};
padding: 1rem;
opacity: ${props => props.disabled ? 0.7 : 1};
background-color: ${props => props.disabled ? '#d69bef' : '#fff'};
font-family: 'Raleway', sans-serif;
font-style: normal;
font-weight: 500;
font-size: 1.2rem;
color: #000000;
::placeholder{
font-size: 1.2rem;
color: ${props => props.disabled ? '#afafaf' : '#000000'};
font-family: 'Raleway', sans-serif;
font-style: normal;
font-weight: 500;
}


`
const Button = styled.button`
display: flex;
align-items: center;
justify-content: center;
width: 90%;
height: 50px;
border-radius: 6px;
border: 1px solid #A329D6;
background-color: #A329D6;
padding: 1rem;
opacity: ${props => props.disabled ? 0.7 : 1};
font-family: 'Raleway', sans-serif;
font-style: normal;
font-weight: 700;
font-size: 1.2rem;
color: #FFFFFF;
`
const TextLink = styled.div`
font-family: 'Raleway', sans-serif;
font-style: normal;
font-weight: 700;
font-size: 1rem;
color: #FFFFFF;
`
export { Container, MyWallet, Form, Input, Button, TextLink };