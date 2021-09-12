import React from 'react';
import {useState} from 'react';
import { useDispatch } from 'react-redux'
import { getDogsBreed } from '../../actions/dogActions';

export default function SearchBar(){
    const dispatch  = useDispatch()
    const [breed, setBreed] = useState('')
    
    function handleInputChange (e){
        e.preventDefault()
        setBreed(e.target.value)
        //console.log(breed)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getDogsBreed(breed))
    }

    return (
        <div>
            <a>Buscar por nombre: </a>
            <input 
            type = 'text'
            placeholder = 'Buscar...'
            onChange = {(e) => handleInputChange(e)}
            />
            <button type='submit' onClick = {(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}