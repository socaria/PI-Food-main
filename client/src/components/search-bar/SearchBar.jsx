import React, { useState } from "react";
import { getCurrentPage, getRecipes } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import './searchBar.css';
import img from '../../image/logo2.png';
import { Link } from "react-router-dom"


export default function SearchBar({ isSearchVisible }) {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const queryParams = useSelector(state => state.queryParams)

    function handleInputChange(e) {
        e.preventDefault();
        setInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getRecipes({
            ...queryParams,
            title: input
        }));
        dispatch(getCurrentPage(1));
        setInput('');

    }
    return (
        <header className="search-bar">
            <a href='/home'>
                <img className="search-bar__img" src={img} alt='img' />

            </a>
            {isSearchVisible && (
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

                        <svg fill="white" viewBox="0 0 50 50" width="30px" height="30px"><path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" /></svg>
                    </button>

                </div>
            )}
            <nav className="search-bar__nav">
                <Link to="/home" className='search-bar__link-button'>
                    Home
                </Link>
                <br></br>
                <Link to="/recipes/create" className='search-bar__link-button'>
                    Create
                </Link>
            </nav>
        </header>
    )
}