import React from "react";
import { NavLink } from 'react-router-dom';

export default function SearchBar() {
    return (
        <header className="navbar">
            <nav>
                <div>
                    <input type='text' placeholder="buscar..." />
                    <button>Buscar</button>
                </div>
                <NavLink exact to="/" >Volver al inicio</NavLink>
                <br></br>
                <NavLink to="/recipes/create">Crear receta</NavLink>
            </nav>
        </header>
    )
}