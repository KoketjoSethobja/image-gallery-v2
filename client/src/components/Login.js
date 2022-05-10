import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState()
    const [status, setStatus] = useState("")
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const login = (e) => {
        axios.post('http://localhost:5000/login', {
            username: username,
            password: password
        }).then((response) => {
            if(response.data.message){
                setStatus(response.data.message)
            } else {
                setStatus(response.data.message)
                setUser(response.data[0].username)
                localStorage.setItem('idUsers', (response.data[0].idUsers))
                localStorage.setItem('username', (response.data[0].username))
                console.log(response.data[0].username+' '+response.data[0].username)
            }
        })
        e.preventDefault();
    }

    useEffect(() => {
        const loggedInUserID = localStorage.getItem('idUsers');
        const loggedInUserName = localStorage.getItem('username');
        if(loggedInUserID && loggedInUserName) {
            navigate('/photos')
        } else {
            navigate('/')
        }
    })

    return (
        <div className='container'>
            <div>
                <img src="" alt="logo" />
                <h1>Sign in to K-Gallery</h1>
                <form onSubmit={(e) => {login(e)}}>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text"
                        value={username}
                        placeholder="enter a username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="password">password</label>
                    <input 
                        type="password" 
                        value={password}
                        placeholder="enter a password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Sign In</button>
                </form>
                <div>
                    <p>Not Registered? <Link to="/register">Register</Link></p>
                </div>
                <p className="">1{status}</p>
            </div>
        </div>
    )
}

export default Login;