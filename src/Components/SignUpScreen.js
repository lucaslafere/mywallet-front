import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { Container, MyWallet, Form, Input, Button, TextLink, ContainerModal } from "./LoginScreen";

export default function SignUpScreen() {
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const URL = "https://my-wallet-lucaslafere.herokuapp.com/sign-up";
    const navigate = useNavigate();


    const body = {
        email,
        name,
        password,
        confirmPassword
    }

    function signUp(event) {
        event.preventDefault();
        setDisabled(true);
        setLoading(true);
        signUpSchema();
    }

    function signUpSchema() {
        if (password !== confirmPassword) {
            setDisabled(false);
            setLoading(false);
            setErrorText("as senhas são diferentes!")
            setError(true);
            return;
        }
        if (name.length < 1) {
            setDisabled(false);
            setLoading(false);
            setErrorText("o campo 'nome' deve ser preenchido")
            setError(true);
            return;
        }
        if (email.length < 1) {
            setDisabled(false);
            setLoading(false);
            setErrorText("o campo 'e-mail' deve ser preenchido")

            setError(true);
            return;
        }
        if (password.length <= 3) {
            setDisabled(false);
            setLoading(false);
            setErrorText("a senha é curta demais (mín. 4 caracteres)")
            setError(true);
            return;
        }
        if (password.length > 15) {
            setDisabled(false);
            setLoading(false);
            setErrorText("a senha é grande demais (máx. 15 caracteres")
            setError(true);
            return;
        }
        else {
            axios.post(URL, body)
                .then(() => {
                    setLoading(false);
                    navigate("/");
                })
                .catch(err => {
                    setLoading(false);
                    setDisabled(false);
                    setErrorText("não foi possível criar sua conta, falha no servidor")
                    setError(true);

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
                <MyWallet>
                    <h1>MyWallet</h1>
                </MyWallet>
                <Form onSubmit={signUp} >
                    <Input
                        placeholder="Nome" type="text" autoComplete="off" disabled={disabled} value={name} onChange={e => setName(e.target.value)} />
                    <Input
                        placeholder="E-mail" type="email" autoComplete="email" disabled={disabled} value={email} onChange={e => setEmail(e.target.value)} />
                    <Input
                        placeholder="Senha (4 a 15 caracteres)" type="password" autoComplete="new-password" disabled={disabled} value={password} onChange={e => setPassword(e.target.value)} />
                    <Input
                        placeholder="Confirme a senha" type="password" autoComplete="new-password" disabled={disabled} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    <Button
                        disabled={disabled}
                        type="submit" >
                        {loading ? <ThreeDots color="#fff" height={80} width={80} /> : "Cadastrar"}
                    </Button>
                </Form>
                <Link to={"/"}>
                    <TextLink>Já tem uma conta? Entre agora!</TextLink>
                </Link>
            </Container>
        </>
    )

}

