import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getDogs } from '../actions';
import { Link } from 'react-router-dom';
import Dog from './Dog'


export default function Home(){
    const dispatch = useDispatch()
    let allDogs = useSelector((state) => state.dogs.data)
    useEffect(()=>{
        dispatch(getDogs())
    },[dispatch])

    function handleClick(e){
        e.preventDefault()
        dispatch(getDogs())
    }

return(
    <div>
        <Link to='/dogs'>Crear Perro</Link>
        <h1>TestApp</h1>
        <button onClick={e => {handleClick(e)}}>
            Cargar los personajes
        </button>
        <div>
            <select>
                <option value= 'temp'>Temperamento</option>
                <option value= 'raza'>Raza</option>
            </select>

            <select>
                <option value= 'asc'>Ascendente</option>
                <option value= 'desc'>Descendente</option>
            </select>
                
            <select>
                <option value= 'orden'>Orden alfabetico</option>
                <option value= 'peso'>Peso</option>
            </select>
            
            {allDogs?.map((c) =>{
                return (
                    <fragment>
                        <Link to={'/home/'+c.id}>
                            <Dog name={c.name} image={c.image} breed={c.breed} key={c.id} />
                        </Link>
                    </fragment>
                )
            })

            }

        </div>
    </div>
    )
}