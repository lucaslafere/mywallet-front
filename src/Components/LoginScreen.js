import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import TokenContext from "../Contexts/TokenContext";
import api from "../Services/api";

export default function LoginScreen() {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setToken } = useContext(TokenContext);

  const body = {
    email,
    password,
  };

  function login(event) {
    event.preventDefault();
    setDisabled(true);
    setLoading(true);
    requestLogin();
  }

  function requestLogin() {
    api
      .post("/login", body)
      .then((res) => {
        setToken(res.data.token);
        setLoading(false);
        navigate("/receipts");
      })
      .catch(() => {
        setDisabled(false);
        setLoading(false);
        setErrorText(
          "não foi possível logar. Verifique seus dados e tente novamente, ou crie uma conta nova"
        );
        setError(true);
      });
  }

  function openModal() {
    if (error) {
      return (
        <ContainerModal onClick={() => setError(false)}>
          <h5>Houve um erro: {errorText}</h5>
          <h5>Clique em qualquer lugar da caixa para retornar</h5>
        </ContainerModal>
      );
    }
  }

  const openError = openModal();

  return (
    <>
      {error ? openError : null}
      <Container error={error}>
        <MyWallet>
          <h1>MyWallet</h1>
        </MyWallet>
        <Form onSubmit={login}>
          <Input
            placeholder='E-mail'
            type='email'
            autoComplete='email'
            disabled={disabled}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder='Senha'
            type='password'
            autoComplete='current-password'
            disabled={disabled}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            disabled={disabled}
            type='submit'>
            {loading ? (
              <ThreeDots
                color='#fff'
                height={80}
                width={80}
              />
            ) : (
              "Entrar"
            )}
          </Button>
        </Form>
        <Link to={"/sign-up"}>
          <TextLink>Primeira vez? Cadastre-se!</TextLink>
        </Link>
      </Container>
    </>
  );
}

const ContainerModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 50%;
  background-color: #a329d6;
  border-radius: 12px;
  z-index: 1;
  position: fixed;
  top: 25vh;
  left: 5vw;

  h5 {
    font-family: "Raleway", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 1.2rem;
    color: #fff;
    text-align: center;
  }
  h6 {
    font-family: "Raleway", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 2rem;
    color: green;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: #8c12be;
`;
const MyWallet = styled.div`
  margin-bottom: 2rem;
  font-family: "Saira Stencil One", cursive;
  font-style: Regular;
  font-size: 32px;
  color: #fff;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;
const Input = styled.input`
  display: flex;
  align-items: center;
  width: 90%;
  height: 58px;
  border-radius: 6px;
  border: ${(props) =>
    props.disabled ? "1px solid #d69bef" : "1px solid #FFF"};
  padding: 1rem;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  background-color: ${(props) => (props.disabled ? "#d69bef" : "#fff")};
  font-family: "Raleway", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 1.2rem;
  color: #000000;
  ::placeholder {
    font-size: 1.2rem;
    color: ${(props) => (props.disabled ? "#afafaf" : "#000000")};
    font-family: "Raleway", sans-serif;
    font-style: normal;
    font-weight: 500;
  }
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 50px;
  border-radius: 6px;
  border: 1px solid #a329d6;
  background-color: #a329d6;
  padding: 1rem;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  font-family: "Raleway", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 1.2rem;
  color: #ffffff;
  cursor: pointer;
`;
const TextLink = styled.div`
  font-family: "Raleway", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 1rem;
  color: #ffffff;
`;
export { Container, MyWallet, Form, Input, Button, TextLink, ContainerModal };
