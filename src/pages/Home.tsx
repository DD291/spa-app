
import { Button, Container } from "@mui/material";
import React, { useEffect, useState } from 'react';
import Login from "./Login";
import TablePage from "./TablePage";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import {useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


 const Home = () => {
    const navigate = useNavigate();
    const token = useSelector((state:any) => state.auth.token) 


    useEffect(() => {
        if (token === "")
            {navigate('/login'); }
        else  
        {navigate('/table'); }
    })


    return (
        <div className="main">
            {/* this is home */}
        </div>
    )

}


export default Home;

