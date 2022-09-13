import React from 'react';
import { Link } from 'react-router-dom';

// TODO agregar imagen de fondo
export default function LandingPage(){
    return(
        <div>
            <h1>Inicio</h1>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}