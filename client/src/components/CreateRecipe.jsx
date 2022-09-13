import React from "react";
import { Link } from 'react-router-dom';
import { createRecipe } from '../actions';
import { useDispatch } from 'react-redux';

export default function CreateRecipe() {
    let [input, setInput] = React.useState({
        title: '',
        summary: '',
        healthScore: 0,
        instructions: '',
        diets: []
    });

    let handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    };

    let dispatch = useDispatch()

    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createRecipe(input));
        setInput({
            title: '',
            summary: '',
            healthScore: 0,
            instructions: '',
            diets: []
        })
    };

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Nombre de receta: </label>
                <input type={'text'} name={'title'} value={input.title} onChange={(e) => handleChange(e)} />
                <label>Resumen: </label>
                <textarea name={'summary'} value={input.summary} onChange={(e) => handleChange(e)} />
                <label>Nivel de comida saludable: </label>
                <input type={'number'} name={'healthScore'} value={input.healthScore} onChange={(e) => handleChange(e)} /> 
                <label>Instrucciones: </label>
                <textarea name={'instructions'} value={input.instructions} onChange={(e) => handleChange(e)} />
                {/* <label>Tipos de dietas: </label>
                <option name={'diets'} value={input.diets} onChange={(e) => handleChange(e)} /> */}
                <button type="submit">Crear receta</button>
            </form>
        </div>
    );
}
