import React from 'react';
import { Link } from 'react-router-dom';
import './landingPage.css'

// TODO agregar imagen de fondo
export default function LandingPage() {
    return (
        <div className='landing-page'>
            <div>
                <h1 className='landing-page__title'>MyRecipes</h1>
                <Link to='/home'>
                    <button className='landing-page__login-buttom'>Ingresar</button>
                </Link>
            </div>
        </div>
    )
}