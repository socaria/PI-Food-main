import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../actions';
import { Link } from 'react-router-dom';
import RecipeCard from "./RecipeCard";

export default function Home() {

    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);

    useEffect(() => {
        dispatch(getRecipes());
    },
        [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }
    return (
        <div>
            <Link to='/recipes'>Crear receta</Link>
            <h1>RECETAS</h1>
            <button onClick={e => handleClick(e)}>
                Volver a cargar recetas
            </button>
            {/* /filtros */}
            <div>
                <select>
                    <option value='titleAsc'>
                        Nombre de receta (A-Z)
                    </option>
                    <option value='titleDesc'>
                        Nombre de receta (Z-A)
                    </option>
                </select>
                <select>
                    <option value='healthScoreAsc'>
                        Nivel de comida saludable (🡹)
                    </option>
                    <option value='healthScoreDesc'>
                        Nivel de comida saludable (🡻)
                    </option>
                </select>
                {/* <select>
                    <option value='All'>Todos</option>
                    <option value='Vegan'>Vegan</option>
                    <option value='Vegetarian'>Vegetarian</option>
                    <option value='glutenFree'>Gluten Free</option>
                </select> */}
                <div>
                    {
                    allRecipes?.map(r => {
                        return(
                        <RecipeCard
                            title={r.title}
                            image={r.image}
                            diets={r.diets}
                        />)
                    })
                }
                </div>
            </div>

        </div>
    )
}