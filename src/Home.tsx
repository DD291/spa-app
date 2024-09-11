
import { Button, Container } from "@mui/material";
import React, { useEffect, useState } from 'react';
import Login from "./Login";
import TablePage from "./Table";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import {useNavigate } from "react-router-dom";


 const Home = () => {
    const navigate = useNavigate();


    useEffect(() => {
        navigate('/login');        
    })


    return (
        <div className="main">
            this is home
        </div>
    )

}


export default Home;

