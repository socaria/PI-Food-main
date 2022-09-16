import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { getRecipes } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import './searchBar.css'

export default function SearchBar() {
    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.recipes);
    const [input, setInput] = useState('');

    useEffect((input) => {
        dispatch(getRecipes(input));
    }, [dispatch]);

    function handleInputChange(e) {
        e.preventDefault();
        setInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getRecipes(input));
        setInput('');
    }
    return (
        <header>
            <nav className="search-bar__container">
                    <div className="search-bar__search-place">
                        <input
                            className="search-bar__input"
                            type='text'
                            placeholder="¿Qué estás buscando?"
                            onChange={e => handleInputChange(e)}
                        />
                        <button
                            className="search-bar__search-button"
                            type={'submit'}
                            onClick={e => handleSubmit(e)}
                        >
                            Buscar
                        </button>
                    </div>
                    <NavLink exact to="/" >
                        <button className='search-bar__link-button'>Volver al inicio</button>
                    </NavLink>
                    <br></br>
                    <NavLink to="/recipes/create">
                        <button className='search-bar__link-button'>Crear receta</button>
                    </NavLink>
            </nav>
        </header>
    )
}