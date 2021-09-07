import { GET_DOGS } from '../actions/dogActions'

let initialState = {
    dogs: [],
};

export default function reducer (state = initialState, actions) {
    const {type, payload} = actions
    switch(type){
        case GET_DOGS:
            return {
                ...state,
                dogs: payload
            }
        default:
            return state
    }
}