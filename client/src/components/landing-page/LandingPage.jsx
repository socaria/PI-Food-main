import React from 'react';
import { Link } from 'react-router-dom';
import './landingPage.css'
import img from '../../image/03.webp';

export default function LandingPage() {
    return (
        <div className='landing-page'>
            <Link to='/home' className='landing-page__link-to'>
                <img className="landing-page__image" src={img} alt='img' />
                <h1 className='landing-page__text'>start here !</h1>
            </Link>
        </div>
    )
}