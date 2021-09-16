import React from 'react';
import {useState} from 'react';
import { useDispatch } from 'react-redux'
import { getDogsBreed } from '../../actions/dogActions';
import './SearchBar.css'

export default function SearchBar(){
    const dispatch  = useDispatch()
    const [breed, setBreed] = useState('')
    
    function handleInputChange (e){
        e.preventDefault()
        setBreed(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getDogsBreed(breed))
    }

    return (
        <div className="searchComponent">
            <input 
            className='inputSearch'
            type = 'text'
            placeholder = 'Buscar...'
            onChange = {(e) => handleInputChange(e)}
            />
            <button type='submit' onClick = {(e) => handleSubmit(e)}>Buscar</button>
        </div>
        
    )
}