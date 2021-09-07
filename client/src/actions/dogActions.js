import axios from 'axios'
import { DOGS_URL } from '../constants'
export const GET_DOGS = 'GET_ DOGS'

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