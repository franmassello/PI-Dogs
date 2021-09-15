import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDogs, filterCreated, filterDogsByTemperament} from "../../actions/dogActions";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import axios from "axios"
import { DOGS_URL_3000 } from "../../constants";
import './Home.css'

export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const [ currentPage, setCurrentPage] = useState(1)
    const [ dogsPerPage] = useState(8)

    const [orderAlfabet, setOrderAlfabet] = useState("")
    const [peso, setPeso] = useState("")

    const indexOfLastDog = currentPage * dogsPerPage // pos es 8
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    /* const [ input, setInput] = useState({
        name: '',
        height: '',
        weight: '',
        image: '',
        lifespan: '',
        temperament:[]
    }) */

    const [ searchTerm ] = useState('')

    const temperaments = useSelector((state) => state.temperaments);
    const [ temperamentSelected] = useState("")

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getDogs());
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:3001/temperament`) 
        .then((res) => {
            dispatch ({
                type: "TEMPERAMENTOS",
                payload: res.data
            })
        })
        .catch((error) => {
        console.log(error);
    });        
    }, [])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }

    const temperamentChange = (e) => {
        dispatch(filterDogsByTemperament(e.target.value))
    }

    const alfabetSelectedChange = (e) => {
        if(e.target.value === "asc-desc") {
            dispatch({
                type: "ordenar-asc-desc"
            })
        }
        else if (e.target.value === "desc-asc") {
            dispatch ({
                type: "ordenar-desc-asc"
            })
        }
        setOrderAlfabet(e.target.value)
    }

    const pesoSelectedChange = (e) => {
        if (e.target.value === "liviano-pesado") {
            dispatch({
                type: "ordenar-liviano-pesado",
              });
        }
        else if (e.target.value === "pesado-liviano") {
            dispatch({
                type: "ordenar-pesado-liviano",
              });
        }
        setPeso(e.target.value)
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }

    /* function handleSelect(e) {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    } */

    /* function handleDelete(el){
        setInput({
            ...input,
            temperament: input.temperament.filter( temp => temp !== el)
        })
    }
 */
    return (
        <div>
            <br></br>
            <button onClick={(e) => {handleClick(e);}}>
                Reiniciar filtros
            </button>

            <div>
                <div className= "select-container">
                    <div>
                        <label>Temperamentos: </label>
                        <select onChange={temperamentChange} /* onClick={temperamentChange} */>
                            <option value='All'>Todos</option>
                            {temperaments?.map((temp) => (
                                <option value={temp.name}>{temp.name}</option>
                                ))}
                        </select>
                        
                    </div>
                </div>

                <p className= "p-select">Ordenar alfabeticamente:
                    <span>
                        <select value={orderAlfabet} onChange= {alfabetSelectedChange}>
                            <option value= "asc-desc">Ascendente a descendente</option>
                            <option value= "desc-asc">Descendente a ascendente</option>
                        </select>
                    </span>
                </p>

                <p className= "p-select">Ordenar por peso:
                    <span>
                        <select value= {peso} onChange= {pesoSelectedChange}>
                            <option value="liviano-pesado">Más liviano a más pesado</option>
                            <option value="pesado-liviano">Más pesado a más liviano</option>
                        </select>
                    </span>
                </p>

                <p className= "p-select">Ordenar por creado:
                    <span>
                        <select onChange= {e =>handleFilterCreated(e)}>
                            <option value="All">Todos</option>
                            <option value="created">Web</option>
                            <option value="api">API</option>
                        </select>
                    </span>
                </p>
                
                <div>
                <SearchBar/>
                <Paginado
                dogsPerPage= {dogsPerPage}
                allDogs = {allDogs.length}
                paginado = {paginado}
                />
                
                <div className='cardsContainer'>
                {currentDogs.filter((dog) => {
                    if(searchTerm === ''){
                        return dog
                    } else if (dog.name.toLowerCase().includes(searchTerm.toLowerCase())){
                        return dog
                    } else if (temperamentSelected){
                        console.log(temperamentSelected)
                    }
                }
                    ).map((dog) => { // antes estaba alldogs.map
                    return (
                    <div className='card'>
                        <div className='card-body'>
                        <img
                            src={dog.img ? dog.img : dog.image}
                            alt="IMG NOT FOUND"
                            className='dogImage'
                        />
                        <h2 className='card-title'>{dog.name}</h2>
                        <p className='card-description'>Temperamentos: {dog.temperaments?.map((temp)=>{return temp + ' '})}</p>    
                        <p>Peso: {dog.weight}</p>
                        
                        
                        <form action={DOGS_URL_3000+dog.id}>
                            <input type='submit' value='Detalles'/>
                        </form>
                        </div>
                    </div>
                    );
                })}
                    </div>
                </div>
            </div>
        </div>
    );
    
    }
