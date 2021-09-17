import React from 'react';
import { Link } from 'react-router-dom';
import { getDetail } from '../../actions/dogActions'; // Falta el get temperaments
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react';
import './Detail.css'

export default function Detail(props){
    /* console.log(props) */
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    },[]) // si saco el dependency array me hace infinitos req a la api cuando voy a ver los detalles[dispatch]
    
    const myDog = useSelector((state) => state.detail)

    var linkBackground = 'https://diarioconvos.com/wp-content/uploads/2021/07/perro.jpg'

    return (
        <div className='component'>
            {
                myDog.length >0 ?
                <div className='dogDetailContainer'>
                    <img className='dogImageDetails' src={myDog[0].img? myDog[0].img: myDog[0].image} alt='' width='400px' height='300px'/>
                        <div className='dogData'>
                            <h2>Raza: {myDog[0].name}</h2>
                            <h2>Weight: {myDog[0].weight} Kg</h2>
                            <h2>Height: {myDog[0].height} Mts</h2>
                            <h2>Temperaments: {myDog[0].temperaments.map(el => el +(', '))}</h2>
                            <h2>Lifespan: {myDog[0].lifespan} </h2>
                        </div>
                </div> : <p>Loading ...</p>
            }
            
        </div>
    )
}