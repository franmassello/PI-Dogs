import React, {useState, useEffect}from 'react';
import {Link, useHistory} from 'react-router-dom';
import {postDog, getTemperaments} from '../../actions/dogActions'; // Falta el get temperaments
import { useDispatch, useSelector } from "react-redux"


function validate(input){
    let errors = {}
    if(!input.name){
        errors.name = 'Se requiere un nombre!'
    } else if (!input.weight){
        errors.weight = 'Se requiere peso!'
    } else if (!input.height){
        errors.height = 'Se requiere altura!'
    }
    return errors
}


export default function CreateDog(){
    const dispatch = useDispatch()
    const history = useHistory()
    const temperaments = useSelector((state) => state.temperaments)
    const [errors,setErrors] = useState({})

    const tempFiltersToApply = (allTempFilter) => {
        let filtersTrue = [];
        for (let i = 0; i < temperaments.length; i++) {
          let nameTemp = temperaments[i].name
          let idTemp = temperaments[i].id
          if(allTempFilter.includes(nameTemp)){
            filtersTrue.push(idTemp)
          }
        }
        return filtersTrue;
      };

    const [ input, setInput] = useState({
        name: '',
        height: '',
        weight: '',
        image: '',
        lifespan: '',
        temperaments:[]
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))

    }

    function handleSelect(e) {
        //let objeto = {id: e.target.value, name: e.target.name}
        setInput({
            ...input,
            temperaments: [...input.temperaments, e.target.value]
        })
    }

    function handleSubmit(e){
        console.log('lifespan recibidas: ',input)
        e.preventDefault()
        let temps = tempFiltersToApply(input.temperaments)
        let newDog = {
            ...input,
            temperaments: temps
        }
        dispatch(postDog(newDog))
        alert('Perro Creado!')
        setInput({
            name: '',
            height: '',
            weight: '',
            image: '',
            lifespan: '',
            temperaments:[]
        })
        history.push('/home')
    }

    function handleDelete(el){
        setInput({
            ...input,
            temperaments: input.temperaments.filter( temp => temp !== el)
        })
    }

    useEffect(() => {
        dispatch(getTemperaments()) //Hacer gettemperaments en actionsgetTemperaments()
    }, [])

    return (
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Crea tu perro!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre: </label>
                    <input
                        input= 'text'
                        value= {input.name}
                        name= 'name'
                        onChange={(e)=>handleChange(e)}
                    />
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Altura: </label>
                    <input
                        input= 'text'
                        value= {input.height}
                        name= 'height'
                        onChange={(e)=>handleChange(e)}
                    />
                    {errors.height && (
                        <p className='error'>{errors.height}</p>
                    )}
                </div>
                <div>
                    <label>Peso: </label>
                    <input
                        input= 'text'
                        value= {input.weight}
                        name= 'weight'
                        onChange={(e)=>handleChange(e)}
                    />
                    {errors.weight && (
                        <p className='error'>{errors.weight}</p>
                    )}
                </div>
                <div>
                    <label>Imagen: </label>
                    <input
                        input= 'text'
                        value= {input.image}
                        name= 'image'
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Lifespan: </label>
                    <input
                        input= 'text'
                        value= {input.lifespan}
                        name= 'lifespan'
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Temperament: </label>
                    <input
                        input= 'text'
                        value= {input.temperaments}
                        name= 'temperaments'
                        size='70'
                    />
                
                <select onChange={handleSelect}>
                    {
                    temperaments.map((temp) => (
                        <option value={temp.name} name={temp.name}>{temp.name}</option>
                        ))}
                </select>
                </div>
                {input.temperaments.map(el =>
                    <div className='divTemp'>
                        <button className='botonX' onClick={()=> handleDelete(el)}>{el} x</button>
                    </div>
                    )
                }
                <button type='submit'> Crear Raza</button>
            </form>
        </div>
    )

}