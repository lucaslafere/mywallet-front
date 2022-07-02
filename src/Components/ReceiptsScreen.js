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
    const receiptsURL = "http://localhost:5000/receipts";

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
        //  else {
        //     return receiptsData.map((el, index) => <Receipt key={index} value={el.value} date={el.date} description={el.description} type={el.type} /> )
        // }
    }

    useEffect(() => getReceipts(), []);
    const renderReceipts = mountReceipts();

    return (
        <Container>
            <NameHeader>
                <h1>Olá, {name}</h1>
                <ion-icon name="exit-outline"></ion-icon>
            </NameHeader>
            <ReceiptsContainer receiptsData={receiptsData}>
                {renderReceipts}
                <Balance>
                    {receiptsData.length === 0 ? "" : <h4>Saldo</h4>}
                </Balance>
            </ReceiptsContainer>
            <ContainerRequest>
                <NewRequest>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <span>Nova entrada</span>
                </NewRequest>
                <NewRequest>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <span>Nova saída</span>
                </NewRequest>
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
gap: 1rem;
justify-content: ${props => props.receiptsData.length === 0 ? "center" : "flex-start"};
    h2{
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 1.2rem;
    text-align: center;
    color: #868686;
    }
:last-child {
    margin-top: 90px;
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
width: 48%;
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