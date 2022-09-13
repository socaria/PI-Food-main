import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { getRecipes } from "../actions";
import { useDispatch, useSelector } from "react-redux";

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
        <header className="navbar">
            <nav>
                <div>
                    <input
                        type='text'
                        placeholder="¿Qué estás buscando?"
                        onChange={e => handleInputChange(e)}
                    />
                    <button type={'submit'} onClick={e => handleSubmit(e)}>
                        Buscar
                    </button>
                </div>
                <NavLink exact to="/" >Volver al inicio</NavLink>
                <br></br>
                <NavLink to="/recipes/create">Crear receta</NavLink>
            </nav>
        </header>
    )
}