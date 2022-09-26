import React from 'react';
import { Link } from 'react-router-dom';
import './message.css'
import img from '../image/error.jpg'

export default function Message({message, type}) {
    return (
        <div className={`message message--${type}`}>
            {message}
        </div>
    )
}