import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { createRecipe, getDiets } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import "./createRecipe.css"

// TODO ver si es necesario realizar otra validación
// TODO ver eliminación de paso, sólo funciona para eliminar último paso
//TODO ver mensaje de error que figura al no colocar url correctamente

export const validate = (input) => {
    let error = {};
    if (!input.title) {
        error.title = "Recipe name is required"
    } else if (!/^[a-zA-Z ,.]*$/.test(input.title)) {
        error.title = `The name of the recipe only admits letters "." and ","`
    }
    if (!input.summary) {
        error.summary = "Recipe summary is required"
    }
    if (input.healthScore < 0 || input.healthScore > 100) {
        error.healthScore = "Health score must have a value between 0 and 100"
    }
    if (/^(https?:\/\/)?([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\da-z\.-]+)*[\/\?]?$/igm.test(input.image)) {
        error.image = 'Must be a url direction'
    }

    return error;
}


export default function CreateRecipe() {
    const dispatch = useDispatch();
    const allDiets = useSelector((state) => state.diets);
    let [input, setInput] = React.useState({
        title: "",
        summary: "",
        healthScore: 0,
        image: "",
        instructions: [""],
        diets: []
    });
    let [error, setError] = React.useState({});


    useEffect(() => {
        dispatch(getDiets());
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

        let objError = validate({ ...input, [e.target.name]: e.target.value });
        console.log("🚀 ~ file: CreateRecipe.jsx ~ line 67 ~ handleChange ~ objError", objError)

        setError(objError);

    };

    const handleDiet = (diet) => {
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
        if (!error.title && !error.summary && !error.healthScore) {
            dispatch(createRecipe(input));
            setInput({
                title: "",
                summary: "",
                healthScore: 0,
                image: "",
                instructions: [],
                diets: []
            })
        }
        return (<alert>Check erors!</alert>)
    };



    return (
        <div className="create-recipe__background">
            <div className="create-recipe__container">
                <Link to={"/home"}>Home</Link>
                <h1 className="create-recipe__title">Make your own recipe</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label className="create-recipe__form-label" >Recipe name: </label>
                        <input
                            className={error?.title ? "create-recipe__input-error" : "create-recipe__input"}
                            type={"text"}
                            name={"title"}
                            value={input.title}
                            onChange={(e) => handleChange(e)}
                        />
                        {
                            error.title && <p>{error.title}</p>
                        }
                    </div>
                    <br></br>
                    <div>
                        <label className="create-recipe__form-label">Summary: </label>
                        <textarea className={error?.summary ? "create-recipe__input-error" : "create-recipe__input"} name={"summary"} value={input.summary} onChange={(e) => handleChange(e)} />
                        {
                            error.summary && <p>{error.summary}</p>
                        }
                    </div>
                    <br></br>
                    <div>
                        <label className="create-recipe__form-label">
                            Health Score:
                        </label>
                        <input
                            className={error?.healthScore ? "create-recipe__input-error" : "create-recipe__input"}
                            type={"number"}
                            name={"healthScore"}
                            value={input.healthScore}
                            onChange={(e) => handleChange(e)}
                        />
                        {
                            error.healthScore && <p>{error.healthScore}</p>
                        }
                    </div>
                    <br></br>
                    <div>
                        <label className="create-recipe__form-label">
                            Image:
                        </label>
                        <input

                            placeholder="https://example.com"
                            // pattern="https://.*" size="30"
                            type="url"
                            name={"image"}
                            value={input.image}
                            onChange={(e) => handleChange(e)}
                        />
                        {
                            error.image && <p>{error.image}</p>
                        }
                    </div>
                    <br></br>
                    <label className="create-recipe__form-label">
                        Steps:
                    </label>
                    {
                        input.instructions?.map(
                            (instruction, index) => {
                                return (
                                    <div key={index}>
                                        <label className="create-recipe__form-label">Paso n° {index + 1}</label>
                                        <textarea
                                            className="input"
                                            name={`instructions_${index}`}
                                            value={input.instructions[index]}
                                            onChange={(e) => handleChange(e)}
                                        />
                                        <button onClick={() => { handleRemoveStep(index) }}>x</button>
                                    </div>
                                )
                            }
                        )

                    }
                    <button
                        onClick={e => handleClickStep(e)}
                        className="create-recipe__add-step-button"
                    >Add step</button>
                    <br></br>
                    <div className="create-recipe__diets__container">
                        <label className="create-recipe__form-label">Diet: </label>
                        <br></br>
                        <div className="create-recipe__diets__container">
                            {
                                allDiets?.map(d => {
                                    return (
                                        <button
                                            type="button"
                                            className={input.diets.includes(d.name) ? "create-recipe__delete-button" : "create-recipe__button"}
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
                    {input.title && input.summary ?
                        <button disabled={false} type="submit">Create recipe</button>
                        : <button disabled={true} type="submit">Create recipe</button>
                    }
                </form>
            </div>
        </div>
    );
}
