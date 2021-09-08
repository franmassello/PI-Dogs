import { GET_DOGS, GET_DOGS_BREED } from '../actions/dogActions'
let initialState = {
    dogs: [],
};

export default function reducer (state = initialState, action) {
    const {type, payload} = action
    switch(type){
        case GET_DOGS:
            return {
                ...state,
                dogs: payload
            }
        case GET_DOGS_BREED:
            const allDogs = state.dogs
            const statusFiltered = action.payload === 'Temperament' ? allDogs : allDogs.filter(el => el.temperament === action.payload)
            return {
                ...state,
                characters: statusFiltered
            }
        default:
            return state
    }
}