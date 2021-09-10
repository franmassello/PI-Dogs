import axios from 'axios'
import { DOGS_URL, GETDOGS_URL } from '../constants'
export const GET_DOGS = 'GET_ DOGS'
export const GET_DOGS_BREED = 'GET_DOGS_BREED'
export const SORT_BREEDS = 'SORT_BREEDS'
export const ASD = 'Razas-A-Z';
export const DES = 'Razas-Z-A';



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
export function sortBreeds(orden, razas){
    let razaSort = [...razas]

    razaSort.sort(function(a,b){
        var nombreA = a.name.toUpperCase();
        var nombreB = b.name.toUpperCase();

        if(orden === ASD){
            if(nombreA < nombreB){
                return -1;
            }
            if(nombreA > nombreB){
                return 1
            }
            return 0
        }
        if(orden === DES){
            if(nombreA < nombreB){
                return 1;
            }
            if(nombreA > nombreB){
                return -1
            }
            return 0
        }
    })
    return function(dispatch){
        dispatch({type: SORT_BREEDS, payload: razaSort})
    }
}

