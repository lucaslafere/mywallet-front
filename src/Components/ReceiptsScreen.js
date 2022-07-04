import { useState, useContext, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';
import TokenContext from '../Contexts/TokenContext';
import NameContext from '../Contexts/NameContext'; 

export default function ReceiptsScreen () {
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [receiptsData, setReceiptsData] = useState([]);
    const navigate = useNavigate();
    const { token } = useContext(TokenContext);
    const { name, setName } = useContext(NameContext);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const receiptsURL = "https://my-wallet-lucaslafere.herokuapp.com/receipts";

    function getReceipts () {
        axios.get(receiptsURL, config)
            .then(res => {
                setReceiptsData(res.data.receipts);
                setName(res.data.name);
            })
            .catch(err => {
                console.log(err);
            })
    }

    function mountReceipts () {
        if (receiptsData.length === 0) {
            return (
                <h2>Não há registros de entrada ou saída</h2>
            )
        }
         else {
            return (
                receiptsData.map((el, index) => 
            <ReceiptDateDescription key={index} date={el.date} description={el.description} value={el.value} type={el.type}>
                <Line type={el.type}>
                    <li>{el.date} {el.description} </li>
                    <span type={el.type} value={el.value}>
                        {el.type === "debt" ? <h2>-{el.value}</h2> : <h2>{el.value}</h2>}
                    </span>
                </Line>
            </ReceiptDateDescription>, calculateBalance()) 
            
        )};
        }
    let balance = 0;
    function calculateBalance () {
        for (let i = 0; i < receiptsData.length; i++) {
            if (receiptsData[i].type === "debt"){
                balance -= Number(receiptsData[i].value)
            }
            else if (receiptsData[i].type === "credit") {
                balance += Number(receiptsData[i].value)
            }
        }
    }

    useEffect(() => getReceipts(), []);
    useEffect(() => calculateBalance(), [])
    const renderReceipts = mountReceipts();

    return (
        <Container>
            <NameHeader>
                <h1>Olá, {name}</h1>
                <ion-icon name="exit-outline"></ion-icon>
            </NameHeader>
            <ReceiptsContainer receiptsData={receiptsData}>
                <ReceiptsList>
                        {renderReceipts}
                </ReceiptsList>
                <Balance balance={balance}>
                    {receiptsData.length === 0 ? "" : <span>SALDO <h3>{balance.toFixed(2)}</h3></span>}
                </Balance>
            </ReceiptsContainer>
            <ContainerRequest>
                <Link to="/new-credit" style={{width: '48%', height: '100%'}}>
                    <NewRequest>
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <span>Nova entrada</span>
                    </NewRequest>
                </Link>
                <Link to={"/new-debt"} style={{width: '48%', height: '100%'}}>
                    <NewRequest>
                        <ion-icon name="remove-circle-outline"></ion-icon>
                        <span>Nova saída</span>
                    </NewRequest>
                </Link>
            </ContainerRequest>
        </Container>
    )

}

const Container = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
flex-direction: column;
height: 100vh;
background-color: #8C12BE;
padding: 0.8rem;
`

const NameHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 92%;
height: 2rem;

h1 {
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 1.8rem;
    line-height: 2rem;
    color: #FFFFFF;
    }
    ion-icon {
        color: #fff;
        font-size: 2rem;
    }
`
const ReceiptsContainer = styled.div`
width: 92%;
height: 70%;
background-color: #fff;
border-radius: 6px;
border: 1px solid #fff;
display: flex;
flex-direction: column;
padding: 0.4rem;
justify-content: ${props => props.receiptsData.length === 0 ? "center" : "space-between"};
    h2{
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 1.2rem;
    text-align: center;
    color: #868686;
    }

`
const Balance = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 20px;
width: 100%;
padding: 0.4rem;

font-family: 'Raleway', sans-serif;
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
    color: ${props => props.balance > 0 ? "#03AC00" : "#C70000"};
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 1.3rem;
    line-height: 20px;
}
`

const ContainerRequest = styled.div`
width: 92%;
height: 114px;
display: flex;
justify-content: space-between;
align-items: center;
`

const NewRequest = styled.div`
height: 100%;
width: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: flex-start;
padding: 0.6rem;

font-family: 'Raleway', sans-serif;
font-style: normal;
font-weight: 700;
font-size: 1rem;
color: #FFFFFF;
line-height: 20px;

background-color: #A329D6;
border-radius: 6px;
border: 1px solid #A329D6;

ion-icon {
        font-size: 1.6rem;
    }
span {
    width: 20%;
}
`
const ReceiptDateDescription = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
height: 20px;
line-height: 20px;
font-family: 'Raleway', sans-serif;
font-style: normal;
font-weight: 400;
font-size: 1rem;
color: #000000;
span {
    color: ${props => props.type === "debt" ? "#C70000" : "#03AC00"};
}
`
const ReceiptsList = styled.ul`
width: 100%;
padding: 0.6rem;
display: flex;
flex-direction: column;
gap: 0.5rem;
`
const Line = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
span {
    color: ${props => props.type === "debt" ? "#C70000" : "#03AC00"};
}
h2 {
    color: ${props => props.type === "debt" ? "#C70000" : "#03AC00"};
}
`