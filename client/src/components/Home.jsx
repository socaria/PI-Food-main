import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, sortByHealthScore, sortByTitle, filterByDiet, getDiets } from '../actions';
import RecipeCard from "./RecipeCard";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";


export default function Home() {

    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const allDiets = useSelector((state) => state.diets);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const [sort, setSort] = useState('default');
    const iOfLastRecipe = currentPage * recipesPerPage;
    const iOfFirstRecipe = iOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(iOfFirstRecipe, iOfLastRecipe)
    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getRecipes());
        dispatch(getDiets());
    },
        [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handleFilterByDiet(e) {
        dispatch(filterByDiet(e.target.value));
    }

    function handleSortByTitle(e) {
        e.preventDefault();
        dispatch(sortByTitle(e.target.value));
        setCurrentPage(1);
        setSort(`Ordered by ${e.target.value}`)
    }

    function handleSortByHealthScore(e) {
        e.preventDefault();
        dispatch(sortByHealthScore(e.target.value));
        setCurrentPage(1);
        setSort(`Ordered by ${e.target.value}`)
    }


    return (
        <div>
            <SearchBar />

            <h1>RECETAS</h1>
            <button onClick={e => handleClick(e)}>
                Volver a cargar recetas
            </button>
            <div>
                <select onChange={(e) => handleSortByTitle(e)}>
                    <option value='titleAsc'>
                        Ordenar por nombre (A-Z)
                    </option>
                    <option value='titleDesc'>
                        Ordenar por nombre (Z-A)
                    </option>
                </select>
                <select onChange={(e) => handleSortByHealthScore(e)}>
                    <option value='healthScoreAsc'>
                        Ordenar por comida saludable (  )
                    </option>
                    <option value='healthScoreDesc'>
                        Ordenar por comida saludable (🡻)
                    </option>
                </select>
                {/* TODO filtrar por más de un valor */}
                <select onChange={(e) => handleFilterByDiet(e)}>
                    <option value='All'>Todas</option>
                    {
                        allDiets?.map(d => {
                            return (
                                <option key={d.id} value={d.name}>{d.name}</option>
                            )
                        })
                    }
                </select>
                <Pagination
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    pagination={pagination}
                />
                <div>
                    {
                        currentRecipes?.map(r => {
                            return (
                                <RecipeCard
                                    title={r.title}
                                    image={r.image ? r.image : <img src='https://w7.pngwing.com/pngs/135/840/png-transparent-drawing-dish-%D0%BA%D0%B0%D1%81%D1%82%D1%80%D1%8E%D0%BB%D1%8F-food-photography-eating.png' />}
                                    diets={r.diets}
                                    id={r.id}
                                    key={r.id}
                                />)
                        })
                    }
                </div>
            </div>

        </div>
    )
}