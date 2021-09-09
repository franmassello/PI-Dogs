import axios from 'axios'
import { DOGS_URL, GETDOGS_URL } from '../constants'
export const GET_DOGS = 'GET_ DOGS'
export const GET_DOGS_BREED = 'GET_DOGS_BREED'
export const SORT_BREEDS = 'SORT_BREEDS'

function setFirstLetterToCap(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getDogs(){
    return async (dispatch) => {
       let allDOGS = await axios(DOGS_URL)
       let action = {
           type: GET_DOGS,
           payload: allDOGS.data
       } 
       return dispatch(action)     
    }
}

export function getDogsBreed(name){
    return async function (dispatch){
        try {
            var json = await axios.get(GETDOGS_URL+name)
            return dispatch({
                type: GET_DOGS_BREED,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export function sortBreeds(orden, dogs){
    return async function (dispatch){
       /*  console.log('Orden:',orden)
        console.log('dogs:', dogs) */
        let dogsSort = [...dogs]
        //let dogsSortedArray = []
        //console.log(dogsSort.length)

        for(var i=0; i < dogsSort.length; i++){
            var lowerCasedA = dogsSort[i].name.toLowerCase()  // Le hago lowercase para la comparacion
            var lowerCasedB = dogsSort[i+1]?.name.toLowerCase()
            console.log(lowerCasedA,'vs' ,lowerCasedB)
            if(orden === 'asc'){
                if(lowerCasedB){ //Verificacion de que exista B
                    console.log('entro al primer if')
                    if(lowerCasedA > lowerCasedB){
                        console.log('entro al segundo if')
                        console.log(lowerCasedA, 'es menor que', lowerCasedB)
                    }
                    if(lowerCasedA < lowerCasedB){ 
                        console.log('entro al tercer if')
                        console.log(lowerCasedA, 'es mayor que', lowerCasedB)
                    }
                }
            }
            if(orden === 'desc'){
                if(lowerCasedB){ //Verificacion de que exista B
                    console.log('entro al primer if DESC')
                    if(lowerCasedA < lowerCasedB){
                        console.log('entro al segundo if DESC')
                        console.log(lowerCasedA, 'es menor que', lowerCasedB)
                    }
                    if(lowerCasedA > lowerCasedB){ 
                        console.log('entro al tercer if DESC')
                        console.log(lowerCasedA, 'es mayor que', lowerCasedB)
                    }
                }
            }

            //var upperCased = setFirstLetterToCap(dogsSort[i].name) // Le pongo la primer letra en uppercase para devolver
            
        }



        /* dogsSort.sort(function(a,b){
            var letA = a.name.toLowerCase()
            var letB = b.name.toLowerCase()
            //console.log(letA)
            // LOGICA : CREAR ARRAY DE PERROS ORDENADOS Y DEVOLVER ESE ARRAY REMPLAZANDO EL ACTUAL
            //console.log(letB)
            if(orden === 'asc'){
                if(letA < letB){
                    //console.log(letB,'es mayor que', letA)
                } // -1
                if(letA > letB){
                    //console.log(letB,'es menor que', letA)
                } // 1
                return 0
            }

            if(orden === 'desc'){
                if(letA < letB){
                    //console.log(letA,'es mayor que', letB)
                } // 1
                if(letA > letB){
                    //console.log(letA,'es menor que', letB)
                } // -1
                return 0
            }
        }) */
        return function(dispatch){
            dispatch({
                type: SORT_BREEDS,
                payload: dogsSort
            })
        }
    }
}

