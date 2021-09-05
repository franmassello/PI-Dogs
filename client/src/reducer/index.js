const initialState = {
    dogs = []
}

function rootReducer(state= initialState, action){
    switch (action.type) {
        case 'GET_DOGS':
            return{
                ...state,
                characters: action.payload
            }
    
        default:
            break;
    }
}

export default rootReducer