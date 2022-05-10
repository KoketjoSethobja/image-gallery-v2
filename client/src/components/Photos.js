import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
 
const Photos = () => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear()
        navigate('/')
    }

    return (
        <div>
            Photos
            <button onClick={logout}>Sign Out</button>

            <div className='image-container'>
                <img className='image' src="../img_avatar.png" alt="image" />
                <div className='overlay'>
                    <p>name</p>
                    <div>
                        <div>
                            <div className='edit-dropdown'>
                                <button className='edit-droptown-btn'>edit</button>
                                <div className='edit-dropdown-content'>
                                    <input type="text" />
                                    <button>tick-edit</button>
                                </div>
                            </div>                            
                            <button>delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default Photos;