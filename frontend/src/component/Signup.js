import React, { useState } from 'react'
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const Signup = (props) => {



    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();



    const submitHandler = async () => {

        if (!username || !email || !password) {


            return;

        }
        console.log(username, email, password);
        try {

            const { data } = await axios.post(
                "/api/v1/register",
                {
                    name: username,
                    email,
                    password,

                }
            );
            console.log(data);

            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/images");
        } catch (error) {
            console.log(error);
        }

    };


    return (
        <>
            <h1>Signup</h1>
            <input id='fullname' type="text" placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input id='emailid' type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input id='password' type="password" placeholder='Enter pass' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={submitHandler}>Sign Up</button>

            <div className="formchange">
                <button className='Switchbtn' onClick={() => props.onFormSwitch('login')} >Already a User ? Login instead</button>
            </div>
        </>
    )
}

export default Signup