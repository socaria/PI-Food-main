import React from 'react';
import './message.css'

export default function Message({message, type}) {
    return (
        <div className={`message message--${type}`}>
            {message}
        </div>
    )
}