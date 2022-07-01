import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';



export default function LoginScreen () {
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const URL = "localhost:5000/login";
    const navigate = useNavigate();

    const body = {
        email,
        password
    }

    function login (event) {
        event.preventDefault();
        setDisabled(true);
        setLoading(true);

        const request = axios.post(URL, body)
        .then((res) => {
            
        })
    }





}