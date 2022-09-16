import React from 'react';
import { Link } from 'react-router-dom';
import './landingPage.css'

export default function LandingPage() {
    return (
        <div className='landing-page'>
            <h1 className='landing-page__title'>MyRecipes</h1>
            <Link to='/home'>
                <button className='landing-page__login-buttom'>Ingresar</button>
            </Link>
        </div>
    )
}