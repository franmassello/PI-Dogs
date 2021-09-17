import React, {useState, useEffect}from 'react';
import {Link, useHistory} from 'react-router-dom';
import {postDog, getTemperaments} from '../../actions/dogActions'; // Falta el get temperaments
import { useDispatch, useSelector } from "react-redux"
import './CreateDog.css'


function validate(input){
    let errors = {}
    if(!input.name){
        errors.name = 'Se requiere un nombre!'
    } else if (!input.weightMin){
        errors.weightMin = 'Se requiere peso minimo!'
    } else if (!input.weightMax){
        errors.weightMax = 'Se requiere peso maximo!'
    } else if (!input.heightMin){
        errors.heightMin = 'Se requiere altura minima!'
    } else if (!input.heightMax){
        errors.heightMax = 'Se requiere altura maxima!'
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
        input.heightMin = input.heightMin + ' - '
        input.height = input.heightMin?.concat(input.heightMax)

        input.weightMin = input.weightMin + ' - '
        input.weight = input.weightMin?.concat(input.weightMax)

        input.lifespan = input.lifespan + ' years'

        /* console.log('lifespan recibido: ',input) */
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
        dispatch(getTemperaments())
    }, [dispatch]) // agregue dispatch entre [] por un bug

    return (
        <div className='mainDiv'>
            <h1 className='h1Text'>Crea tu perro!</h1>
            <form className='formSubmit'onSubmit={(e) => handleSubmit(e)}>
                <div className='labels'>
                    <label>Nombre: </label>
                    <label>Altura: </label>
                    <label>Peso: </label>
                    <label>Imagen: </label>
                    <label>Esperanza de vida: </label>
                    <label className='tempLabel'>Temperamentos: </label>
                </div>
                <div className='allInputs'>
                <div>
                    <input
                        className='inputName   '
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

                    <input
                        input= 'text'
                        value= {input.heightMin}
                        name= 'heightMin'
                        className='heightMin'
                        onChange={(e)=>handleChange(e)}
                        placeholder='mínima'
                    />
                    <input
                        input= 'text'
                        value= {input.heightMax}
                        name= 'heightMax'
                        className='heightMax'
                        onChange={(e)=>handleChange(e)}
                        placeholder='máxima'
                    />
                    {errors.heightMin && (
                        <p className='error'>{errors.heightMin}</p>
                    )}
                    {errors.heightMax && (
                        <p className='error'>{errors.heightMax}</p>
                    )}
                </div>
                <div>
                    <input
                        input= 'text'
                        value= {input.weightMin}
                        name= 'weightMin'
                        onChange={(e)=>handleChange(e)}
                        placeholder='mínimo'
                        className='pesoMin'
                    />
                    <input
                        input= 'text'
                        value= {input.weightMax}
                        name= 'weightMax'
                        onChange={(e)=>handleChange(e)}
                        placeholder='máximo'
                        className='pesoMax'
                    />
                    {errors.weightMin && (
                        <p className='error'>{errors.weightMin}</p>
                    )}
                </div>
                <div>
                    <input
                        input= 'text'
                        value= {input.image}
                        name= 'image'
                        onChange={(e)=>handleChange(e)}
                        className='imageInput'
                    />
                </div>
                <div>
                    <input
                        input= 'text'
                        value= {input.lifespan}
                        name= 'lifespan'
                        onChange={(e)=>handleChange(e)}
                        placeholder='años'
                        className='lifespanInput'
                    />
                </div>
                <div className='inputDiv'>
                    <input
                        input= 'text'
                        value= {input.temperaments}
                        name= 'temperaments'
                        size='70'
                        onChange={() => {}} //onChange vacio por bug
                        className='inputTemps'
                    />
                    
                
                <select onChange={handleSelect} onClick={handleDelete}>
                    {
                    temperaments.map((temp) => (
                        <option key={temp.name} value={temp.name} name={temp.name} >{temp.name}</option>
                        ))}
                </select>
                <button className='submitButton' type='submit' disabled={
                    !input.name || !input.heightMin || !input.heightMax || !input.weightMax || !input.weightMin || !input.image || !input.lifespan || !input.temperaments
                    }> Crear Raza</button>
                
                </div>
                {input.temperaments.map(el =>
                    <div key={el} className='divTemp'>
                        <button  className='botonX' onClick={()=> handleDelete(el)}>{el} x</button>
                    </div>
                    )
                }
                
                
                </div>
            </form>
            
        </div>
    )

}