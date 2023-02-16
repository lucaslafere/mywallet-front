import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import TokenContext from "../Contexts/TokenContext";
import NameContext from "../Contexts/NameContext";
import { ContainerModal } from "./LoginScreen";

export default function ReceiptsScreen() {
  const [receiptsData, setReceiptsData] = useState([]);
  const [registerData, setRegisterData] = useState({
    value: 0,
    description: "",
    type: "",
  });
  const { token, setToken } = useContext(TokenContext);
  const { name, setName } = useContext(NameContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [confirm, setConfirm] = useState(false);
  const receiptsURL = "https://my-wallet-api.netlify.app/receipts";
  const navigate = useNavigate();

  function getReceipts() {
    axios
      .get(receiptsURL, config)
      .then((res) => {
        setReceiptsData(res.data.receipts);
        setName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function deleteRegister() {
    const delete_url =
      "https://my-wallet-api.netlify.app/delete-register";
    const delete_body = registerData;
    console.log(delete_body);
    console.log(config);
    const promise = axios
      .post(delete_url, delete_body, config)
      .then((res) => {
        console.log("deu bom");
        setConfirm(false);
      })
      .catch((err) => {
        console.log("deu erro");
        console.log(promise)
      });
  }

  function mountReceipts() {
    if (receiptsData.length === 0) {
      return <h2>Não há registros de entrada ou saída</h2>;
    } else {
      return receiptsData.map(
        (el, index) => (
          <ReceiptDateDescription
            key={index}
            date={el.date}
            description={el.description}
            value={el.value}
            type={el.type}
          >
            <Line type={el.type}>
              <li>
                {el.date} {el.description}{" "}
              </li>
              <span type={el.type} value={el.value}>
                {el.type === "debt" ? (
                  <h2>R$ -{el.value}</h2>
                ) : (
                  <h2>R$ {el.value}</h2>
                )}
                <ion-icon
                  name="close-outline"
                  onClick={() => {
                    setRegisterData({
                      value: el.value,
                      description: el.description,
                      type: el.type,
                    });
                    setConfirm(true);
                  }}
                ></ion-icon>
              </span>
              
            </Line>
          </ReceiptDateDescription>
        ),
        calculateBalance()
      );
    }
  }

  function openModal() {
    if (confirm) {
      return (
        <ContainerModal>
          <h5>Deseja mesmo apagar esse registro?</h5>
          <br></br>
          <h6 onClick={deleteRegister}>Sim</h6>
          <br></br>
          <h5 onClick={() => setConfirm(false)}>Cancelar</h5>
        </ContainerModal>
      );
    }
  }
  const openConfirm = openModal();
  let balance = 0;
  function calculateBalance() {
    for (let i = 0; i < receiptsData.length; i++) {
      if (receiptsData[i].type === "debt") {
        balance -= Number(receiptsData[i].value);
      } else if (receiptsData[i].type === "credit") {
        balance += Number(receiptsData[i].value);
      }
    }
  }

  useEffect(() => getReceipts(), []);
  useEffect(() => getReceipts(), [confirm]);
  useEffect(() => calculateBalance(), []);
  const renderReceipts = mountReceipts();

  function logout() {
    setToken("");
    navigate("/");
  }

  return (
    <>
      {confirm ? openConfirm : null}
      <Container>
        <NameHeader>
          <h1>Olá, {name}</h1>
          <ion-icon name="exit-outline" onClick={() => logout()}></ion-icon>
        </NameHeader>
        <ReceiptsContainer receiptsData={receiptsData}>
          <ReceiptsList>{renderReceipts}</ReceiptsList>
          <Balance balance={balance}>
            {receiptsData.length === 0 ? (
              ""
            ) : (
              <span>
                SALDO <h3>{balance.toFixed(2)}</h3>
              </span>
            )}
          </Balance>
        </ReceiptsContainer>
        <ContainerRequest>
          <Link to="/new-credit" style={{ width: "48%", height: "100%" }}>
            <NewRequest>
              <ion-icon name="add-circle-outline"></ion-icon>
              <span>Nova entrada</span>
            </NewRequest>
          </Link>
          <Link to={"/new-debt"} style={{ width: "48%", height: "100%" }}>
            <NewRequest>
              <ion-icon name="remove-circle-outline"></ion-icon>
              <span>Nova saída</span>
            </NewRequest>
          </Link>
        </ContainerRequest>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: #8c12be;
  padding: 0.8rem;
`;

const NameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 92%;
  height: 2rem;

  h1 {
    font-family: "Raleway", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 1.8rem;
    line-height: 2rem;
    color: #ffffff;
  }
  ion-icon {
    color: #fff;
    font-size: 2rem;
  }
`;
const ReceiptsContainer = styled.div`
  width: 92%;
  height: 70%;
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid #fff;
  display: flex;
  flex-direction: column;
  padding: 0.4rem;
  justify-content: ${(props) =>
    props.receiptsData.length === 0 ? "center" : "space-between"};
  h2 {
    font-family: "Raleway", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
    text-align: center;
    color: #868686;
  }
`;
const Balance = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  width: 100%;
  padding: 0.4rem;

  font-family: "Raleway", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 1rem;
  line-height: 20px;
  color: #000000;

  span {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  h3 {
    color: ${(props) => (props.balance > 0 ? "#03AC00" : "#C70000")};
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    font-size: 1.3rem;
    line-height: 20px;
  }
`;

const ContainerRequest = styled.div`
  width: 92%;
  height: 114px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NewRequest = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.6rem;

  font-family: "Raleway", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 1rem;
  color: #ffffff;
  line-height: 20px;

  background-color: #a329d6;
  border-radius: 6px;
  border: 1px solid #a329d6;

  ion-icon {
    font-size: 1.6rem;
  }
  span {
    width: 20%;
  }
`;
const ReceiptDateDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 20px;
  line-height: 20px;
  font-family: "Raleway", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  color: #000000;
  span {
    color: ${(props) => (props.type === "debt" ? "#C70000" : "#03AC00")};
  }
`;
const ReceiptsList = styled.ul`
  width: 100%;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: scroll;
`;
const Line = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  span {
    color: ${(props) => (props.type === "debt" ? "#C70000" : "#03AC00")};
    display: flex;
  }
  h2 {
    color: ${(props) => (props.type === "debt" ? "#C70000" : "#03AC00")};
  }
  ion-icon {
    color: black;
  }
`;
