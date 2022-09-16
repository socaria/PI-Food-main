import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { createRecipe, getDiets } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import './createRecipe.css'

//TODO validaciones de formulario HTML y JS (ver en video)
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

    };


    const handleCheck = (diet) => {
        setInput({
            ...input,
            diets: [...input.diets, diet]
        })
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
    // TODO agregar bien los pasos de las instructions
    return (
        <div className="create-recipe__background">
            <div className="create-recipe__container">
                <Link to={'/home'}>Volver</Link>
                <h1 className="create-recipe__title">Crea tu receta</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label className="label" >Nombre de receta: </label>
                        <input className='input' type={'text'} name={'title'} value={input.title} onChange={(e) => handleChange(e)} />
                    </div>
                    <br></br>
                    <div>
                        <label className="label">Resumen: </label>
                        <textarea className='input' name={'summary'} value={input.summary} onChange={(e) => handleChange(e)} />
                    </div>
                    <br></br>
                    <div>
                        <label className="label">Nivel de comida saludable: </label>
                        <input className='input' type={'number'} name={'healthScore'} value={input.healthScore} onChange={(e) => handleChange(e)} />
                    </div>
                    <br></br>
                    <button onClick={e => handleClickStep(e)}>Agregar paso</button>
                    {
                        input.instructions?.map(
                            (instruction, index) => {
                                return (
                                    <div key={instruction.step}>
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
                                            className="create-recipe__button"
                                            key={d.name}
                                        
                                            onChange={() => handleCheck(d.name)}
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
