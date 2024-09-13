import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { CircularProgress }  from '@mui/material';
import {useNavigate } from "react-router-dom";
import '..//login.css';
import { authService } from '../redux/authService';
import { HOST,LOGIN_L } from '../axios/vars';


const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiResp, setApiResp] = useState("null");


    const [user, setUser] = useState({
        name: "",
        pw: "",
        token: ""
    })

    const handelInput = (event:any) => {
        event.preventDefault();
        const { name, value } = event.target;
        console.log(name, value)
        setUser({ ...user, [name]: value });
        setError(false);
    }

    const handelSubmit = async (event:any) => {
        event.preventDefault();

        if (!user.name.includes("user") || user.pw != "password"){
            setError(true);
        }
        else
        {
        
        setLoading(true);
        const url = HOST+LOGIN_L;
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
            setApiResp(data.data.token);


            if (response.ok) {
                const respAuth = await authService.login({
                    userName : user.name,
                    password : user.pw,
                    token: data.data.token 
                }) 

                console.log("redux response: " + respAuth);
                sessionStorage.setItem('token', data.data.token);
                setLoading(false);
                navigate('/table', 
                    {
                        state: {
                          "token" : apiResp
                }});
            } 


          

        } catch (error:any) {
            setLoading(false);
            setError(error.message);
        } 


        setLoading(false);
    }


    }

    return (
        <div className='user-form'>
            <div className='heading'>
            {loading &&  (<CircularProgress />) }
                <p>Необходима авторизация</p>
            </div>
            <form 
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handelSubmit}>
                <div className="mb-4">
                 <label className="block text-gray-700 text-sm font-bold mb-2">
                    Имя пользователя
                </label>
                <TextField type="text"
                id="name" name="name" 
                value={user.name} onChange={handelInput}
                placeholder="Username"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </TextField>
                </div>
                <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" >
                Пароль
                </label>
                <TextField
                type="text" id="pw" name="pw" value={user.pw} onChange={handelInput}
                placeholder="********"
                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
                </TextField>
                {error && <p className="text-red-500 text-xs italic">
                    Неправильный пароль</p>}
                </div>
                <div className="flex items-center justify-between">
                <Button type="submit" 
                // style={{background: 'cyan'}}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                >ОК</Button>
                </div>
            </form>
        </div>
    )
}

export default Login