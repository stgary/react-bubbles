import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth'

const Login = () => {

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const history = useHistory();
    
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        
        setCredentials({
            ...credentials,
            [name]: value
        })
    };

    const login = e => {
        e.preventDefault();
        axiosWithAuth()
        .post('/api/login', credentials)
        .then(res => {
            console.log(res);
            window.localStorage.setItem("token", res.data.payload);
            history.push('/bubblepage');
        })
        .catch(err => {
            console.log(err);
        });
    };


    return (
        <div className='form-container'>
            <h6>Sign In</h6>
            <form onSubmit={login}>
                <label>Username</label> 
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                />
            <label>Password</label>
            <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
            />
            <button>Log in</button>
            </form>
        </div>
    );
};

export default Login;
