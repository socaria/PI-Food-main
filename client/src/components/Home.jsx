import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, sortByHealthScore, sortByTitle, filterByDiet, getDiets } from '../actions';
import RecipeCard from "./RecipeCard";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import './home.css';
import img from '../image/04.jpg'


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
        <div className="home__background">
            
            <div className="home__container">
                <SearchBar />
                <h1>Recipes</h1>
                <button
                    className="home__button"
                    onClick={e => handleClick(e)}
                >
                    Reload recipes
                </button>
                <div>
                    <select
                        onChange={(e) => handleSortByTitle(e)}
                        className="home__filter"
                    >
                        <option
                            value='titleAsc'>
                            Sort by name (A-Z)
                        </option>
                        <option
                            value='titleDesc'>
                            Sort by name (Z-A)
                        </option>
                    </select>
                    <select
                        onChange={(e) => handleSortByHealthScore(e)}
                        className="home__filter"
                    >
                        <option value='healthScoreAsc'>
                            Sort by health score (🢁)
                        </option>
                        <option value='healthScoreDesc'>
                            Sort by health score (🡻)
                        </option>
                    </select>
                    {/* TODO filtrar por más de un valor */}
                    <select onChange={(e) => handleFilterByDiet(e)}>
                        <option value='All'>All</option>
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
                </div>
                <div className="home__recipe-card">
                    {
                        currentRecipes?.map(r => {
                            return (
                                <div>
                                    <RecipeCard
                                        title={r.title}
                                        image={r.image || img}
                                        diets={r.diets}
                                        id={r.id}
                                        key={r.id}
                                        healthScore={r.healthScore}
                                    />
                                    <br></br>
                                </div>
                            )

                        })
                    }
                </div>
            </div>

        </div>
    )

}