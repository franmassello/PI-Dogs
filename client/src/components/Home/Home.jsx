import React from "react";
import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
//import { DOGS_URL } from "../../constants"
import { getDogs } from "../../actions/dogActions";

export default function DogCards() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(getDogs());
  }, []);

  function handleClick(e){
    e.preventDefault()
    dispatch(getDogs())
    }

  return (
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
        <div>
            {allDogs?.map((dog) => {
            return (
                <div>
                <p>{dog.name}</p>
                <img src={dog.img.url} alt="IMG NOT FOUND" />
                </div>
                    );
                })
            }
        </div>
    </div>
    </div>
  );
}
