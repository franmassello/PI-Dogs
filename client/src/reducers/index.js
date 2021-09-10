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
            return {
                ...state,
                dogs: action.payload
            }
        case "ordenar-liviano-pesado":
            return {
                ...state,
                dogs: state.dogs.sort((a,b) => parseInt(a.weight.metric.slice(0, 3)) - parseInt(b.weight.metric.slice(0, 3))) 
            };
        case "ordenar-pesado-liviano":
            return {
                ...state,
                dogs: state.dogs.sort((a,b) => parseInt(b.weight.metric.slice(0, 3)) - parseInt(a.weight.metric.slice(0, 3)))
            };
        case "ordenar-asc-desc":
            return {
                ...state,
                dogs: state.dogs.sort(function(a, b){
                    if(a.name < b.name) { return -1; }
                    if(a.name > b.name) { return 1; }
                    return 0;
                })
            }
        case "ordenar-desc-asc":
            return {
                ...state,
                dogs: state.dogs.sort(function(a, b){
                    if(a.name > b.name) { return -1; }
                    if(a.name < b.name) { return 1; }
                    return 0;
                })
            }
        default:
            return state
    }
}