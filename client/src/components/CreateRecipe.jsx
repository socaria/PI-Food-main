import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { createRecipe, getDiets } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import './createRecipe.css'

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
            <h1 className="h1">Crea tu receta</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="div">
                    <label className="label" >Nombre de receta: </label>
                    <input className='input' type={'text'} name={'title'} value={input.title} onChange={(e) => handleChange(e)} />
                </div>

                <div className="div">
                    <label className="label">Resumen: </label>
                    <textarea className='input' name={'summary'} value={input.summary} onChange={(e) => handleChange(e)} />
                </div>
                <div className="div">
                    <label className="label">Nivel de comida saludable: </label>
                    <input className='input' type={'number'} name={'healthScore'} value={input.healthScore} onChange={(e) => handleChange(e)} />
                </div>
                <div className="div">
                    <label className="label">Instrucciones: </label>
                    <label className="label">Paso n° 1</label>
                    <textarea className='input' name={'instructions'} value={input.instructions} onChange={(e) => handleChange(e)} />
                </div>
                <div className="div">
                    <label className="label">Tipos de dietas: </label>
                    <br></br>
                    {
                        allDiets?.map(d => {
                            return (
                                <label className="label" key={d.name}>{d.name}
                                    <input 
                                        className='input'
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
