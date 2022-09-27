import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, sortBy, filterByDiet, getDiets, getCurrentPage } from '../../actions';
import RecipeCard from "../recipe-card/RecipeCard";
import SearchBar from "../search-bar/SearchBar";
import Pagination from "../pagination/Pagination";
import './home.css';
import img from '../../image/04.jpg';
import Message from "../message/Message";


export default function Home() {

    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const allDiets = useSelector((state) => state.diets);
    const errorMessage = useSelector((state) => state.errorMessage);
    const currentPage = useSelector((state) => state.currentPage)
    // const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage= 9;
    const iOfLastRecipe = currentPage * recipesPerPage;
    const iOfFirstRecipe = iOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(iOfFirstRecipe, iOfLastRecipe)
    
    const [queryParams, setqueryParams] = useState(null);
    

    useEffect(() => {
        dispatch(getRecipes());
        dispatch(getDiets());
    },
        [dispatch]);

    useEffect(() => {
        dispatch(getRecipes(queryParams));
        getCurrentPage(1);

    }, [dispatch, queryParams])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }
    function handlePagination(pageNumber) {
        dispatch(getCurrentPage(pageNumber))
    }
    function handleFilterByDiet(e) {
        e.preventDefault();
        setqueryParams({
            ...queryParams,
            diet: e.target.value,
        });

    }


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
                {errorMessage ?
                    <Message message={errorMessage} type="info" />
                    : (
                        <>
                            <div className="home-filters__container">
                                <select
                                    onChange={(e) => sortByA(e)}
                                    className="home__filter"
                                >
                                    <option className="home__filter" value=''>Sort by...</option>
                                    <option
                                        value='titleAsc'>
                                        Sort by name (A-Z)
                                    </option>
                                    <option
                                        value='titleDesc'>
                                        Sort by name (Z-A)
                                    </option>
                                    <option value='healthScoreAsc'>
                                        Sort by health score (🢁)
                                    </option>
                                    <option value='healthScoreDesc'>
                                        Sort by health score (🡻)
                                    </option>
                                </select>
                                <select className="home__filter" onChange={(e) => handleFilterByDiet(e)}>
                                    <option value=''>Filter by diet</option>
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
                                handlePagination={handlePagination}
                                currentPage={currentPage}
                            />
                            <div className="home__recipe-card">
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

                        </>
                    )
                }
            </div>


        </>
    )

}