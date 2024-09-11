import React, { useState } from 'react';
import { Button, TextField, Paper, Typography, Container, Box } from '@mui/material';
import { Link } from "react-router-dom";
import { CircularProgress }  from '@mui/material';
import {useNavigate } from "react-router-dom";
import './login.css';

const Login = () => {
    const navigate = useNavigate();
    const HOST = "https://test.v5.pryaniky.com";
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [apiResp, setApiResp] = useState("null");
    const [tableData, setTableData] = useState("tabledtaa");


    const [user, setUser] = useState({
        name: "",
        password: ""
    })

    const handelInput = (event:any) => {
        event.preventDefault();
        const { name, value } = event.target;
        console.log(name, value)
        setUser({ ...user, [name]: value });
    }

    const handelSubmit = async (event:any) => {
        setLoading(true);
        event.preventDefault();
        // console.log(user)
        const url = HOST+"/ru/data/v3/testmethods/docs/login";
        // console.log("url is: " + url);
        try {
            let response = 
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                  {
                  "username": "user134",
                  "password": "password"
                  }
                ),
            });

            let data = await response.json()
            // .then(response=> response.body ? response.body : null)
            // .then(myJson=> myJson ? console.log("my: "+ ) :null )
            // .then(res=>res.clone().json())


            setApiResp(data.data.token)
            // const json = await response.json();
            console.log("!!!!!!data is " + JSON.stringify(data));
            // .then(() => console.log("json is " + response.json()))

            // if (response.ok) {
            //     // console.log('Form submitted successfully!');
            //     setUser({name: "",password: ""})
            //     console.log("response: " + (response.json()));
            //     // setLoading(false);
            //     // navigate('/table');
            // } else {
            //     setLoading(false);
            //     console.error('Form submission failed!');
            // }

          

        } catch (error:any) {
            setLoading(false);
            setError(error.message);
        } 



console.log("===================================================")

        // const urlDownload = HOST+"/ru/data/v3/testmethods/docs/userdocs/get";
        // try {
        //     console.log("===="+apiResp);
        //   let response = await fetch(urlDownload, {
        //         method: 'GET',
        //         body: JSON.stringify(
        //           {
        //           "x-auth": apiResp
        //           }
        //         ),
        //     });
        //     console.log("after");
        //     let dataTable = await response.json()
        //     console.log("data table: " + JSON.stringify(dataTable));
        //     setTableData(dataTable.data);


        // } catch (error:any) {
        //     setError(error.message);
        // } 



        setLoading(false);

        navigate('/table', 
            {
                state: {
                  "token" : apiResp
        }});

    }

    return (
        <div className='user-form'>
            <div className='heading'>
            {loading &&  (<CircularProgress />) }
            {error && <p>Error: {error}</p>}
                <p>Необходима авторизация</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    {/* <label for="name" className="form-label">Name</label> */}
                    <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    {/* <label for="pwd" className="form-label">Phone</label> */}
                    <input type="text" className="form-control" id="password" name="password" value={user.password} onChange={handelInput} />
                </div>
                <Button type="submit" style={{background: 'cyan'}} 
                >ОК</Button>
                <div>{JSON.stringify(apiResp)} </div>
                <div>{JSON.stringify(tableData)} </div>

            </form>
        </div>
    )
}

export default Login