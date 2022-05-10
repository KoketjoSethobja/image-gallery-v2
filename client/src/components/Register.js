import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
 
const Register = () => {
    const [usernameReg, setUsernameReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [status, setStatus] = useState("")
    const [color, setColor] = useState("")

    axios.defaults.withCredentials = true;
    
    const register = (e) => {
        axios.post('http://localhost:5000/register', {
            username: usernameReg,
            password: passwordReg
        }).then((response) => {
            if(response.data.message){
                setStatus(response.data.message)
                setColor('red')
            } else {
                setStatus(response.data.passed)
                setColor('green')
            }
        })
        e.preventDefault();
    }

    return (
        <div className='container'>
            <div>
                <img src="" alt="logo" />
                <h1>Register to K-Gallery</h1>
                <form onSubmit={(e) => {register(e)}}>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text"
                        value={usernameReg}
                        placeholder="enter a username"
                        onChange={(e) => setUsernameReg(e.target.value)}
                    />
                    <label htmlFor="password">password</label>
                    <input 
                        type="password" 
                        value={passwordReg}
                        placeholder="enter a password"
                        onChange={(e) => setPasswordReg(e.target.value)}
                    />
                    <button type="submit">Register</button>
                </form>
                <div>
                    <p>Already Registered? <Link to="/login">Sign In</Link></p>
                </div>
                <p className="my-2 text-red-900" style={{color: color}}>{status}</p>	
            </div>
        </div>
    )
}
 
export default Register;