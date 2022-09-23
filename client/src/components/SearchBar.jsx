import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { getRecipes } from "../actions";
import { useDispatch } from "react-redux";
import './searchBar.css';
import img from '../image/logo2.png';



export default function SearchBar() {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    useEffect((input) => {
        console.log("🚀 ~ file: SearchBar.jsx ~ line 15 ~ useEffect ~ input", input)
        dispatch(getRecipes({title: input}));
    }, [dispatch]);

    function handleInputChange(e) {
        e.preventDefault();
        setInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getRecipes({title: input}));
        setInput('');
    }
    return (
        <header className="search-bar">
                <a href='/home'>
            <img className="search-bar__img" src={img} alt='img'/>

                </a>
            <div className="search-bar__search">
                <input
                    className="search-bar__input"
                    type='text'
                    placeholder="Search a recipe... "
                    onChange={e => handleInputChange(e)}
                
                />
                <button
                    className="search-bar__search-button"
                    type={'submit'}
                    onClick={e => handleSubmit(e)}
                >
                    🔍︎
                </button>
            </div>
            <nav className="search-bar__nav">
                <NavLink exact to="/home"  className='search-bar__link-button'>
                    Home
                </NavLink>
                <br></br>
                <NavLink to="/recipes/create" className='search-bar__link-button'>
                    ✚ Create
                </NavLink>
            </nav>
        </header>
    )
}