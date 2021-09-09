import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs, getDogsBreed, sortBreeds } from "../../actions/dogActions";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";

export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const [ currentPage, setCurrentPage] = useState(1)
    const [ dogsPerPage, setDogsPerPage ] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage // pos es 8
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const [ searchTerm, setSearchTerm] = useState('')

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

    function handleChangeAscDesc(e){
        e.preventDefault()
        let valorOrden = e.target.value

        dispatch(sortBreeds(valorOrden, allDogs))
        //console.log(dispatch(sortBreeds(e.target.value, allDogs)))
        //console.log(e.target.value) 
        //console.log(allDogs) // es el arreglo de todos los perros
        //console.log(allDogs[1].name) // Afhgan hound
    }
  /*   function handleFilterBreed(e){
        dispatch(getDogsBreed(e.target.value))
    }
     */
    return (
        <div>
        <Link to="/dogs">Crear Perro</Link>
        <h1>DogsApp</h1>
        <button onClick={(e) => {handleClick(e);}}>
            Recargar los personajes
        </button>

        <div>

            <select>
            <option value="asc">Temperamento</option>
            </select>

            <select onChange={(e)=>{handleChangeAscDesc(e)}}>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>

            <select>
            <option value="peso">Peso</option>
            </select>
            
            <div>
            <SearchBar/>
            <Paginado
            dogsPerPage= {dogsPerPage}
            allDogs = {allDogs.length}
            paginado = {paginado}
            />
            
            
            {currentDogs.filter((dog) => {
                if(searchTerm == ''){
                    return dog
                } else if (dog.name.toLowerCase().includes(searchTerm.toLowerCase())){
                    return dog
                }
            }
                ).map((dog) => { // antes estaba alldogs.map
                return (
                <div>
                    <p>Raza: {dog.name}</p>
                    <p>Temperamentos: {dog.temperament?.map((temp)=>{return temp + ' '})}</p>    
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
        </div>
        </div>
    );
    }
