import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from '../../Assets/star-wars-logo1.png';
import { signin } from "../../Store/Action";
import './Login.css';



const Login = () => {
    const [nameValue, setNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const dispatch = useDispatch();

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(signin(nameValue, passwordValue));
    }

    return (
        <div className='login-box'>
            <div className='login-container'>
                <form onSubmit={(e) => submitForm(e)} className='login-form'>
                    <img src={logo} className='login-inputs login-logo' />
                    <div className='login-inputs'>
                        <input 
                            type='text'
                            className='user-input' 
                            placeholder='Username *'
                            value={nameValue}
                            required
                            onChange={e => setNameValue(e.target.value)} />
                    </div>
                    <div className='login-inputs'>
                        <input 
                            type='password'
                            className='user-input'
                            placeholder='Password *'
                            value={passwordValue}
                            required
                            onChange={e => setPasswordValue(e.target.value)} />
                    </div>
                    <div className='login-inputs'>
                        <button>START</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;