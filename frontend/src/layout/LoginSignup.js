import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Login from '../component/Login';
import Signup from '../component/Signup';
import "./loginsignup.css"

const LoginSignup = () => {

    const [currentForm, setCurrentForm] = useState('signup');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (user) {
            navigate("/images");
        }

    },[navigate]);


    return (
        <div className="LoginSignup">
            <div className="Form">
                <div className="formcard">
                    {
                        currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> : <Signup onFormSwitch={toggleForm} />
                    }

                </div>
            </div>
        </div>
    )
}

export default LoginSignup