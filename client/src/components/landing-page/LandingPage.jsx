import React from 'react';
import { Link } from 'react-router-dom';
import './landingPage.css'

export default function LandingPage() {
    return (
        <div className='landing-page'>
            <h1 className='landing-page__title'>MyRecipes</h1>
            <Link to='/home' className='landing-page__link-to'>
                <button className='landing-page__login-button'>Start</button>
            </Link>
        </div>
    )
}