import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs, sortBreeds, filterCreated } from "../../actions/dogActions";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import axios from "axios"
import { DOGS_URL_3000 } from "../../constants";

export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const [ currentPage, setCurrentPage] = useState(1)
    const [ dogsPerPage, setDogsPerPage ] = useState(8)

    const [orderAlfabet, setOrderAlfabet] = useState("")
    const [peso, setPeso] = useState("")

    const indexOfLastDog = currentPage * dogsPerPage // pos es 8
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const [ input, setInput] = useState({
        name: '',
        height: '',
        weight: '',
        image: '',
        lifespan: '',
        temperament:[]
    })

    const [ searchTerm, setSearchTerm] = useState('')

    const temperaments = useSelector((state) => state.temperaments);
    const [temperamentSelected, setTemperamentSelected] = useState("")

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

    function handleChangeAscDesc(e){
        e.preventDefault()
        let valorOrden = e.target.value
        dispatch(sortBreeds(valorOrden, allDogs))
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

    const temperamentChange = (e) => {
        let temperament = e.target.value
        setTemperamentSelected(temperament)
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }

    function handleSelect(e) {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }

    function handleDelete(el){
        setInput({
            ...input,
            temperament: input.temperament.filter( temp => temp !== el)
        })
    }



    return (
        <div>
        <Link to="/dogs">Crear Perro</Link>
        <h1>DogsApp</h1>
        <button onClick={(e) => {handleClick(e);}}>
            Recargar los personajes
        </button>

        <div>
            <div className= "select-container">
                <div>
                    <label>Temperamentos: </label>
                    <select onChange={handleSelect}>
                        {temperaments?.map((temp) => (
                            <option value={temp.name}>{temp.name}</option>
                            ))}
                    </select>
                    <input
                        input= 'text'
                        value= {input.temperament}
                        name= 'temperament'
                        size='70'
                    />
                    <button>Buscar</button>
                    {input.temperament.map(el =>
                    <div className='divTemp'>
                        {/* <p>{el}</p> */}
                        <button className='botonX' onClick={()=> handleDelete(el)}>{el} x</button>
                    </div>
                    )
                }
                </div>
            </div>

            <a className= "p-select">Ordenar alfabeticamente:</a>
            <select value={orderAlfabet} onChange= {alfabetSelectedChange}>
                <option value= "asc-desc">Ascendente a descendente</option>
                <option value= "desc-asc">Descendente a ascendente</option>
            </select>

            <a className= "p-select">Ordenar por peso:</a>
            <select value= {peso} onChange= {pesoSelectedChange}>
                <option value="liviano-pesado">Más liviano a más pesado</option>
                <option value="pesado-liviano">Más pesado a más liviano</option>
            </select>

            <a className= "p-select">Ordenar por creado:</a>
            <select onChange= {e =>handleFilterCreated(e)}>
                <option value="All">Todos</option>
                <option value="created">Creados</option>
                <option value="api">Existentes</option>
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
                        src={dog.img}
                        width="450px"
                        height="250px"
                        alt="IMG NOT FOUND"
                    />
                    <form action={DOGS_URL_3000+dog.id}>
                        <input type='submit' value='Detalles'/>
                    </form>
                    
                </div>
                );
            })}
            </div>
        </div>
        </div>
    );
    }
