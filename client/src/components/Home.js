import React, { useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    useEffect(() => {
        window.reload = () => {
            const loggedInUserID = localStorage.getItem('idUsers');
            const loggedInUserName = localStorage.getItem('username');
            if(loggedInUserID && loggedInUserName) {
                navigate('/photos')
            } else {
                navigate('/')
            }
        }        
    })

    return (
        <div className="">
            <h1>Home</h1>
            <a><Link to="/login">Login</Link></a>
            <a><Link to="/register">Register</Link></a>
        </div>
    )
}

export default Home;