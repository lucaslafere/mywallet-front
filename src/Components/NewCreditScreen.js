import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from "react-loader-spinner";
import styled from 'styled-components';
import TokenContext from "../Contexts/TokenContext";
import { ContainerModal } from "./LoginScreen";


export default function NewCreditScreen() {
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const URL = "https://my-wallet-lucaslafere.herokuapp.com/newCredit";
    const navigate = useNavigate();

    const { token } = useContext(TokenContext)

    const body = {
        description,
        value
    }
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    function postNewCredit(event) {
        event.preventDefault();
        setDisabled(true);
        setLoading(true);
        newCreditSchema();
    }

    function newCreditSchema() {
        if (description.length > 18) {
            setDisabled(false);
            setLoading(false);
            setErrorText("sua descriçao não pode ter mais que 18 caracteres")
            setError(true);
            return;
        }
        if (description.length < 1) {
            setDisabled(false);
            setLoading(false);
            setErrorText("deve haver uma descrição")
            setError(true);
            return;
        }
        if (value <= 0) {
            setDisabled(false);
            setLoading(false);
            setErrorText("o campo valor deve ser maior que 0")
            setError(true);
            return;
        }
        else {
            axios.post(URL, body, config)
                .then(() => {
                    setLoading(false);
                    navigate("/receipts");
                })
        }
    }
    function openModal() {
        if (error) {
            return (
                <ContainerModal onClick={() => setError(false)}>
                    <h5>Houve um erro: {errorText}</h5>
                    <h5>Clique em qualquer lugar da caixa para retornar</h5>
                </ContainerModal>
            )
        }
    }

    const openError = openModal();
    return (
        <>
            {error ? openError : null}
            <Container>
                <Title >
                    <h1>Nova entrada</h1>
                </Title>
                <Form onSubmit={postNewCredit} >
                    <Input
                        placeholder="Valor" type="number" autoComplete="off" disabled={disabled} value={value} onChange={e => setValue(e.target.value)} />
                    <Input
                        placeholder="Descrição" type="text" autoComplete="off" disabled={disabled} value={description} onChange={e => setDescription(e.target.value)} />
                    <Button
                        disabled={disabled}
                        type="submit" >
                        {loading ? <ThreeDots color="#fff" height={80} width={80} /> : "Salvar entrada"}
                    </Button>
                </Form>
            </Container>
        </>
    )
}

const Container = styled.div`
display: flex;
justify-content: flex-start;
align-items: flex-start;
flex-direction: column;
height: 100vh;
background-color: #8C12BE;
padding: 1.5rem;
`
const Title = styled.div`
width: 100%;
height: 32px;
font-family: 'Raleway', sans-serif;
font-style: normal;
font-weight: 700;
font-size: 26px;
line-height: 32px;
margin-bottom: 40px;
color: #FFFFFF;

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