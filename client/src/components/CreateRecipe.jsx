import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { createRecipe, getDiets } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import './createRecipe.css'

// TODO ver si es necesario realizar otra validación
//TODO poner foto por defecto

export const validate = (input) => {
    let error = {};
    if (!input.title) {
        error.title = "El nombre de la receta es requerido"
    } else if (!/^[a-zA-Z ,.]*$/.test(input.title)) {
        error.title = "El nombre de la receta no puede contener carácteres especiales"
    }
    if (!input.summary) {
        error.summary = "El resumen de la receta es requerido"
    }
    if (input.healthScore < 0 || input.healthScore > 100){
        error.healthScore = "El nivel de comida saludable debe tener un valor entre 0 y 100"
    }
    // if (input.instructions)
    // if (input.diets){

    // }
    return error;
}
export default function CreateRecipe() {
    const dispatch = useDispatch();
    const allDiets = useSelector((state) => state.diets);
    let [input, setInput] = React.useState({
        title: '',
        summary: '',
        healthScore: 0,
        instructions: [''],
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
        console.log("🚀 ~ file: CreateRecipe.jsx ~ line 62 ~ handleChange ~ objError", objError)


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

    const handleClickStep = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            instructions: [...input.instructions, '']
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createRecipe(input));
        setInput({
            title: '',
            summary: '',
            healthScore: 0,
            instructions: [],
            diets: []
        })
    };



    return (
        <div className="create-recipe__background">
            <div className="create-recipe__container">
                <Link to={'/home'}>Volver</Link>
                <h1 className="create-recipe__title">Crea tu receta</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label className="label" >Nombre de receta: </label>
                        <input
                            className={error?.title ? "create-recipe__input-error" : "create-recipe__input"}
                            type={'text'}
                            name={'title'}
                            value={input.title}
                            onChange={(e) => handleChange(e)}
                        />
                        {
                            error.title && <p>{error.title}</p>
                        }
                    </div>
                    <br></br>
                    <div>
                        <label className={error?.summary ? "create-recipe__input-error" : "create-recipe__input"}>Resumen: </label>
                        <textarea className='input' name={'summary'} value={input.summary} onChange={(e) => handleChange(e)} />
                        {
                            error.summary && <p>{error.summary}</p>
                        }
                    </div>
                    <br></br>
                    <div>
                        <label className={error?.healthScore ? "create-recipe__input-error" : "create-recipe__input"}>
                            Nivel de comida saludable: 
                        </label>
                        <input className='input' type={'number'} name={'healthScore'} value={input.healthScore} onChange={(e) => handleChange(e)} />
                        {
                            error.healthScore && <p>{error.healthScore}</p>
                        }
                    </div>
                    <br></br>
                    <button onClick={e => handleClickStep(e)}>Agregar paso</button>
                    {
                        input.instructions?.map(
                            (instruction, index) => {
                                return (
                                    <div key={index}>
                                        <label className="label">Paso n° {index + 1}</label>
                                        <textarea
                                            className='input'
                                            name={`instructions_${index}`}
                                            value={input.instructions[index]}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                )
                            }
                        )

                    }
                    <br></br>
                    <div className="create-recipe__diets__container">
                        <label >Tipos de dietas: </label>
                        <br></br>
                        <div className="create-recipe__diets__container">
                            {
                                allDiets?.map(d => {
                                    return (
                                        <button
                                            type='button'
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
                    <button type="submit">Crear receta</button>
                </form>
            </div>
        </div>
    );
}
