import React from 'react';
import { Link } from 'react-router-dom';
import { getDetail } from '../../actions/dogActions'; // Falta el get temperaments
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react';

export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    },[dispatch])
    
    const myDog = useSelector((state) => state.detail)

    return (
        <div>
            {
                myDog.length >0 ?
                <div>
                    <h1>{myDog[0].name}</h1>
                    <img src={myDog[0].img? myDog[0].img: myDog[0].image} alt='' width='400px' height='300px'/>
                    <h2>Weight: {myDog[0].weight}</h2>
                    <h2>Height: {myDog[0].height}</h2>
                    <h4>Temperaments: {!myDog[0].createdInDb ? myDog[0].temperament + '' : myDog[0].temperaments.temperament(el => el.name +(''))}</h4>
                    <h4>Lifespan: {myDog[0].lifespan}</h4>
                </div> : <p>Loading ...</p>
            }
            <Link to= '/home'>
                <button>Volver</button>
            </Link>
        </div>
    )
}