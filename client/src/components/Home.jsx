import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, sortBy, filterByDiet, getDiets } from '../actions';
import RecipeCard from "./RecipeCard";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import './home.css';
import img from '../image/04.jpg';
import Error from "./Error";


export default function Home() {

    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const allDiets = useSelector((state) => state.diets);
    const getError = useSelector((state) => state.getError);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const [sort, setSort] = useState('default');
    const iOfLastRecipe = currentPage * recipesPerPage;
    const iOfFirstRecipe = iOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(iOfFirstRecipe, iOfLastRecipe)
    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const [queryParams, setqueryParams] = useState(null);
    console.log("🚀 ~ file: Home.jsx ~ line 29 ~ Home ~ queryParams", queryParams)


    useEffect(() => {
        dispatch(getRecipes());
        dispatch(getDiets());
    },
        [dispatch]);

        useEffect(() => {
            dispatch(getRecipes(queryParams));
            setCurrentPage(1);

        }, [dispatch, queryParams])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handleFilterByDiet(e) {
        e.preventDefault();
        setqueryParams({
            ...queryParams,
            diet: e.target.value,
        });

    }

    // function handleSortByTitle(e) {
    //     e.preventDefault();
    //     dispatch(sortByTitle(e.target.value));
    //     setCurrentPage(1);
    //     setSort(`Ordered by ${e.target.value}`)
    // }

    // function handleSortByHealthScore(e) {
    //     e.preventDefault();
    //     dispatch(sortByHealthScore(e.target.value));
    //     setCurrentPage(1);
    //     setSort(`Ordered by ${e.target.value}`)
    // }


    function sortByA(e) {
        e.preventDefault();
        setqueryParams({
            ...queryParams,
            sortBy: e.target.value,
        });
    }
    return (
        <>
            <SearchBar />
            <div className="home__container">

                <h1>Recipes</h1>

                <div className="home-filters__container">
                    <select
                        onChange={(e) => sortByA(e)}
                        className="home__filter"
                    >
                        <option value=''>Sort by health name</option>
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
                        onChange={(e) => sortByA(e)}
                        className="home__filter"
                    >
                        <option value=''>Sort by health score</option>
                        <option value='healthScoreAsc'>
                            Sort by health score (🢁)
                        </option>
                        <option value='healthScoreDesc'>
                            Sort by health score (🡻)
                        </option>
                    </select>
                    {/* TODO filtrar por más de un valor */}
                    <select onChange={(e) => handleFilterByDiet(e)}>
                        <option value=''>All</option>
                        {
                            allDiets?.map(d => {
                                return (
                                    <option key={d.id} value={d.name}>{d.name}</option>
                                )
                            })
                        }
                    </select>
                    <button
                        className="home__button"
                        onClick={e => handleClick(e)}
                    >
                        Clean filters
                    </button>
                </div>
                <Pagination
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    pagination={pagination}
                />
                {/* TODO dar estilo al error */}
                {getError ?
                    <div>
                        <Error message={getError} />
                        <div>{getError}</div>
                    </div>
                    : <div className="home__recipe-card">
                        {
                            currentRecipes?.map(r => {
                                return (
                                    <div key={r.id}>
                                        <RecipeCard
                                            title={r.title}
                                            image={r.image || img}
                                            diets={r.diets}
                                            id={r.id}
                                            healthScore={r.healthScore}
                                        />
                                        <br></br>
                                    </div>
                                )

                            })
                        }
                    </div>
                }
            </div>

        </>
    )

}