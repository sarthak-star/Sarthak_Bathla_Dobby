import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./login.css"

const Login = (props) => {

    
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const submitHandler = async () => {

        if (!email || !password) {
            console.log("Please fill all the fields.")

            return;
        }
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                }

            };
            const { data } = await axios.post(
                "/api/v1/login",
                {

                    email,
                    password

                },
                config
            );

            console.log("Login Successful")
            console.log(data);
            localStorage.setItem("userInfo", JSON.stringify(data));

            navigate("/images");
        } catch (error) {
            console.log(error);

        }


    };

    return (
        <>
            <h1>Login</h1>
            <input id='email' type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input id='password' type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="userinput">
                <button onClick={submitHandler}>Login</button>
            </div>
            <div className="formchange">
                <button className='Switchbtn' onClick={() => props.onFormSwitch('signup')} >Not a User ? Signup here</button>
            </div>
        </>
    )
}

export default Login