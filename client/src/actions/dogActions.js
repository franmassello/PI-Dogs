import axios from 'axios'
import { DOGS_URL } from '../constants'
export const GET_DOGS = 'GET_ DOGS'
export const GET_DOGS_BREED = 'GET_DOGS_BREED'

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

export function getDogsBreed(input){
    return async (dispatch) => {
        let dogsObtained = await axios(DOGS_URL)
        let action = {
            type: GET_DOGS_BREED,
            payload: dogsObtained.data
        }
        return dispatch(action)
    }
}