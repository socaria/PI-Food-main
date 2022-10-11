import React, { useEffect } from "react";
import * as actions from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import "./editRecipe.css"
import SearchBar from "../search-bar/SearchBar";
import img from '../../image/04.jpg';
import { useHistory } from "react-router-dom";
import { validate } from '../../utils/validate'


export default function EditRecipe() {
    const dispatch = useDispatch();
    const history = useHistory();
    const recipeDetail = useSelector(state => state.recipeDetail)
    const allRecipes = useSelector(state => state.allRecipes)
    const allDiets = useSelector((state) => state.diets);
    let [input, setInput] = React.useState({
        title: recipeDetail.title,
        summary: recipeDetail.summary,
        healthScore: recipeDetail.healthScore,
        image: recipeDetail.image,
        instructions: recipeDetail.instructions,
        diets: recipeDetail.diets.map(d => d.name)
    });
    let [error, setError] = React.useState({});


    useEffect(() => {
        dispatch(actions.getDiets());
        dispatch(actions.getRecipes());
    }, []);

    const handleChange = (e) => {
        const aux = input.instructions;
        if (e.target.name.includes("instructions")) {
            aux[e.target.name.split("_")[1]] = e.target.value;
            setInput({
                ...input,
                instructions: aux
            })
        } else {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
        }
        let objError = validate({ ...input, [e.target.name]: e.target.value }, allRecipes, recipeDetail.id);
        setError(objError);
    };

    const handleDiet = (diet) => {
        console.log("🚀 ~ file: EditRecipe.jsx ~ line 53 ~ handleDiet ~ input.diets", input.diets)
        if (!input.diets.includes(diet)) {
            setInput({
                ...input,
                diets: [...input.diets, diet]
            })
            return true;
        } else {
            setInput({
                ...input,
                diets: input.diets.filter(d => d !== diet)
            })
            return false;
        }
    }

    const handleRemoveStep = (index) => {
        input.instructions.splice(index, 1);
        setInput({
            ...input,
            instructions: input.instructions
        })
    }

    const handleClickStep = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            instructions: [...input.instructions, ""]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.title && !error.title && !error.summary && !error.healthScore && !error.image) {
            dispatch(actions.editRecipe(recipeDetail.id, input));
            alert('The recipe was modified successfully!');
            history.pushState(`/recipes/${recipeDetail.id}`);
        }
    };


    return (
        <>
            <SearchBar />
            <div className="edit-recipe__container">

                <h1 className="edit-recipe__title">Edit your own recipe</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="edit-recipe__input-container">
                        <label className="edit-recipe__form-label" >Recipe name</label>
                        <input
                            className={`edit-recipe__input ${error?.title ? "edit-recipe__input--error" : ""}`}
                            type={"text"}
                            name={"title"}
                            value={input.title}
                            onChange={(e) => handleChange(e)}
                        />
                        {
                            error.title && <p className="edit-recipe__input-message-error">{error.title}</p>
                        }
                    </div>
                    <br></br>
                    <div className="edit-recipe__input-container">
                        <label className="edit-recipe__form-label">Summary</label>
                        <textarea className={`edit-recipe__input ${error?.summary ? "edit-recipe__input--error" : ""}`} name={"summary"} value={input.summary} onChange={(e) => handleChange(e)} />
                        {
                            error.summary && <p className="edit-recipe__input-message-error">{error.summary}</p>
                        }
                    </div>
                    <br></br>
                    <div className="edit-recipe__input-container">
                        <label className="edit-recipe__form-label">
                            Health Score
                        </label>
                        <input
                            className={`edit-recipe__input ${error?.healthScore ? "edit-recipe__input--error" : ""}`}
                            type={"number"}
                            name={"healthScore"}
                            value={input.healthScore}
                            onChange={(e) => handleChange(e)}
                        />
                        {
                            error.healthScore && <p className="edit-recipe__input-message-error">{error.healthScore}</p>
                        }
                    </div>
                    <br></br>
                    <div className="edit-recipe__input-container">
                        <label className="edit-recipe__form-label">
                            Image
                        </label>
                        <input
                            placeholder="https://example.com"
                            name={"image"}
                            className={`edit-recipe__input ${error?.image ? "edit-recipe__input--error" : ""}`}
                            value={input.image}
                            onChange={(e) => handleChange(e)}
                        />
                        {
                            error.image && <p className="edit-recipe__input-message-error">{error.image}</p>
                        }

                    </div>
                    {input.image && !error.image ?
                        <img className="edit-recipe__image-preview" src={input.image} width='150px' />
                        : <img className="edit-recipe__image-preview" src={img} width='150px' />
                    }
                    <br></br>
                    <br></br>
                    <label className="edit-recipe__form-label">
                        Steps
                    </label>
                    <br></br>
                    {
                        input.instructions?.map(
                            (instruction, index) => {
                                return (
                                    <div className="edit-recipe__input-container" key={index}>
                                        <label className="edit-recipe__form-label">Paso n° {index + 1}</label>
                                        <div className="edit-recipe__step-container">
                                            <textarea
                                                className="edit-recipe__input edit-recipe__input-textarea"
                                                name={`instructions_${index}`}
                                                value={input.instructions[index]}
                                                onChange={(e) => handleChange(e)}
                                            />
                                            <button className="edit-recipe__step-delete" type='button' onClick={() => { handleRemoveStep(index) }}><svg fill="white" viewBox="0 0 128 128" width="32px" height="32px"><path d="M 49 1 C 47.34 1 46 2.34 46 4 C 46 5.66 47.34 7 49 7 L 79 7 C 80.66 7 82 5.66 82 4 C 82 2.34 80.66 1 79 1 L 49 1 z M 24 15 C 16.83 15 11 20.83 11 28 C 11 35.17 16.83 41 24 41 L 101 41 L 101 104 C 101 113.37 93.37 121 84 121 L 44 121 C 34.63 121 27 113.37 27 104 L 27 52 C 27 50.34 25.66 49 24 49 C 22.34 49 21 50.34 21 52 L 21 104 C 21 116.68 31.32 127 44 127 L 84 127 C 96.68 127 107 116.68 107 104 L 107 40.640625 C 112.72 39.280625 117 34.14 117 28 C 117 20.83 111.17 15 104 15 L 24 15 z M 24 21 L 104 21 C 107.86 21 111 24.14 111 28 C 111 31.86 107.86 35 104 35 L 24 35 C 20.14 35 17 31.86 17 28 C 17 24.14 20.14 21 24 21 z M 50 55 C 48.34 55 47 56.34 47 58 L 47 104 C 47 105.66 48.34 107 50 107 C 51.66 107 53 105.66 53 104 L 53 58 C 53 56.34 51.66 55 50 55 z M 78 55 C 76.34 55 75 56.34 75 58 L 75 104 C 75 105.66 76.34 107 78 107 C 79.66 107 81 105.66 81 104 L 81 58 C 81 56.34 79.66 55 78 55 z" /></svg></button>
                                        </div>
                                    </div>
                                )
                            }
                        )

                    }
                    <br></br>
                    <button
                        className="edit-recipe__button"
                        onClick={e => handleClickStep(e)}

                    >
                        Add step
                    </button>
                    <br></br>
                    <div className="edit-recipe__diets__container">
                        <label className="edit-recipe__form-label">Diet type</label>
                        <br></br>
                        <div className="edit-recipe__diets__container">
                            {
                                allDiets?.map(d => {
                                    return (
                                        <button
                                            type="button"
                                            className={input.diets.includes(d.name) ? "edit-recipe__delete-button" : "edit-recipe__button"}
                                            key={d.name}
                                            onClick={() => handleDiet(d.name)}
                                        >
                                            {d.name}
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <br></br>
                    {input.title && input.summary && !error.title && !error.summary && !error.healthScore && !error.image ?
                        <button className="edit-recipe__button" disabled={false} type="submit">Save changes</button>
                        : <button className="edit-recipe__button edit-recipe__button--disabled" disabled={true} type="submit">Save changes</button>
                    }
                </form>
            </div>
        </>
    );
}
