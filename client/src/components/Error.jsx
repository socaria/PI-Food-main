import React from 'react';
import { Link } from 'react-router-dom';
import './error.css'
import img from '../image/error.jpg'

export default function Error() {
    return (
        <div className='error-container'>
            <img width='400px' src={img}/>
            <h3 >Error: </h3>
        </div>
    )
}