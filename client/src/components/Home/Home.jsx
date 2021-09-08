import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import { DOGS_URL } from "../../constants"
import { getDogs, getDogsBreed } from "../../actions/dogActions";
import Paginado from "../Paginado/Paginado";

export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const [ currentPage, setCurrentPage] = useState(1)
    const [ dogsPerPage, setDogsPerPage ] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage // pos es 8
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getDogs());
    }, []);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }

    function handleFilterBreed(e){
        //console.log('HOla')
        dispatch(getDogsBreed(e.target.value))
    }
    
    return (
        <div>
        <Link to="/dogs">Crear Perro</Link>
        <h1>DogsApp</h1>
        <button onClick={(e) => {handleClick(e);}}>
            Cargar los personajes
        </button>
        <div>
            <form className="breedSearch" onSubmit={handleFilterBreed}>
                <label>Buscar Raza:   </label>
                <input type="text" name="raza"></input>
                <button>Enter</button> 
                <br></br>
            </form>

            <select>
            <option value="asc">Temperamento</option>
            </select>

            <select>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
            </select>

            <select>
            <option value="orden">Orden alfabetico</option>
            <option value="peso">Peso</option>
            </select>
            
            <div>
            <Paginado
            dogsPerPage= {dogsPerPage}
            allDogs = {allDogs.length}
            paginado = {paginado}
            />
            
            {currentDogs?.map((dog) => { // antes estaba alldogs.map
                return (
                <div>
                    <p>Raza: {dog.name}</p>
                    <p>Temperamentos: {dog.temperament.map((temp)=>{return temp + ' '})}</p>    
                    <p>Peso: {dog.weight}</p>
                    <img
                        src={dog.img.url}
                        width="450px"
                        height="250px"
                        alt="IMG NOT FOUND"
                    />
                </div>
                );
            })}
            </div>
            <Paginado
            dogsPerPage= {dogsPerPage}
            allDogs = {allDogs.length}
            paginado = {paginado}
            />
        </div>
        </div>
    );
    }
