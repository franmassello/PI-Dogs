import { GET_DOGS, GET_DOGS_BREED, SORT_BREEDS } from '../actions/dogActions'
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
            return {
                ...state,
                dogs: action.payload
            }
        case SORT_BREEDS:
            return {
                ...state,
                dogs : action.payload
            }
        default:
            return state
    }
}