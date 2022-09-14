import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { createRecipe, getDiets } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

//TODO validaciones de formulario HTML y JS
export default function CreateRecipe() {
    const dispatch = useDispatch();
    const allDiets = useSelector((state) => state.diets);
    let [input, setInput] = React.useState({
        title: '',
        summary: '',
        healthScore: 0,
        instructions: [],
        diets: []
    });
    console.log("🚀 ~ file: CreateRecipe.jsx ~ line 17 ~ CreateRecipe ~ input", input)

    useEffect(() => {
        dispatch(getDiets());
    }, []);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };
    
    const handleCheck = (e) => {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
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
        <div>
            <Link to={'/home'}>Volver</Link>
            <h1>Crea tu receta</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre de receta: </label>
                    <input type={'text'} name={'title'} value={input.title} onChange={(e) => handleChange(e)} />
                </div>

                <div>
                    <label>Resumen: </label>
                    <textarea name={'summary'} value={input.summary} onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Nivel de comida saludable: </label>
                    <input type={'number'} name={'healthScore'} value={input.healthScore} onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Instrucciones: </label>
                    <label>Paso n° 1</label>
                    <textarea name={'instructions'} value={input.instructions} onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Tipos de dietas: </label>
                    <br></br>
                    {
                        allDiets?.map(d => {
                            return (
                                <label key={d.name}>{d.name}
                                    <input
                                        type='checkbox'
                                        name={d.name}
                                        value={d.name}
                                        onChange={e => handleCheck(e)}
                                    />
                                    <br></br>
                                </label>
                            )
                        })
                    }
                </div>
                <button type="submit">Crear receta</button>
            </form>
        </div>
    );
}
