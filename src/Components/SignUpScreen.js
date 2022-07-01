import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { Container, MyWallet, Form, Input, Button, TextLink } from "./LoginScreen";

export default function SignUpScreen () {
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const URL = "http://localhost:5000/sign-up";
    const navigate = useNavigate();
    
    const body = {
        email,
        name,
        password,
        confirmPassword
    }

    function signUp (event) {
        event.preventDefault();
        setDisabled(true);
        setLoading(true);
        if (password !== confirmPassword) {
            alert("As senhas digitadas são diferentes!");
            setDisabled(false);
            setLoading(false);
            return;
        }
        if (name.length < 1) {
            alert("O campo 'Nome' deve ser preenchido");
            setDisabled(false);
            setLoading(false);
            return;
        }
        if (email.length < 1) {
            alert("Preencha o campo 'E-mail' corretamente");
            setDisabled(false);
            setLoading(false);
            return;
        }
        if (password.length <= 3) {
            alert("Sua senha é curta demais. Por favor digite uma senha com pelo menos 4 caracteres");
            setDisabled(false);
            setLoading(false);
            return;
        }
        if (password.length > 15) {
            alert("Sua senha é grande demais. Por favor digite uma senha com até 15 caracteres");
            setDisabled(false);
            setLoading(false);
            return;
        }
        else {
        axios.post(URL, body)
            .then(() => {
                setLoading(false);
                alert("Sua conta foi criada com sucesso!")
                navigate("/");
            })
            .catch(err => {
                alert(err);
                setLoading(false);
                setDisabled(false);
            })
        }
    }

    return (
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
                    placeholder="Senha" type="password" autoComplete="new-password" disabled={disabled} value={password} onChange={e => setPassword(e.target.value)} />
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
    )

}