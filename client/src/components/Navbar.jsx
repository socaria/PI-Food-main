import React from 'react';
import { NavLink } from 'react-router-dom';
import img from './landingPage.css'

import './navbar.css';

export default function Navbar() {
    return (
        <header className="navbar__container">
            <div>
                <p>RECETAS</p>
                {/* <img id="logoHenry" src={img} width="30" height="30" className="d-inline-block align-top" alt="" /> */}
            </div>
            {/* <nav>
                <ul className="list">
                    <li className="list-item">
                        <NavLink exact to="/home" >Home</NavLink>
                    </li>
                </ul>
            </nav> */}
        </header>
    )
}