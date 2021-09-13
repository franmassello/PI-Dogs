import { GET_DOGS, GET_DOGS_BREED } from '../actions/dogActions'
let initialState = {
    dogs: [],
    allDogs: [],
    detail: [],
    temperaments: []
};

export default function reducer (state = initialState, action) {
    const {type, payload} = action
    switch(type){
        case GET_DOGS:
            return {
                ...state,
                dogs: payload,
                allDogs: action.payload
            }
        case GET_DOGS_BREED:
            return {
                ...state,
                dogs: action.payload
            }
        case "FILTER_CREATED":
            const createdFilter = action.payload === 'created' ? state.allDogs.filter( el => el.createdInDb) : state.allDogs.filter( el => !el.createdInDb)
            return {
                ...state,
                dogs: action.payload === 'All' ? state.allDogs : createdFilter
            }

        case "POST_DOG":
            return {
                ...state, 
            }

        case "GET_TEMPERAMENTS":
            return {
                ...state,
                temperaments: action.payload
            }

        case "ordenar-liviano-pesado":
        return {
                ...state,
                dogs: state.dogs.sort((a,b) => parseInt(a.weight.slice(0, 3)) - parseInt(b.weight.slice(0, 3))) 
            };
        case "ordenar-pesado-liviano":
            return {
                ...state,
                dogs: state.dogs.sort((a,b) => parseInt(b.weight.slice(0, 3)) - parseInt(a.weight.slice(0, 3)))
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
        case "TEMPERAMENTOS": 
            return {
                ...state,
                temperaments: action.payload
                };
        case "GET_DETAILS":
            return {
                ...state,
                detail: action.payload
            }
        default:
            return state
    }
}