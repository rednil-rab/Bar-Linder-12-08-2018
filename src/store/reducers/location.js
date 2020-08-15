import * as actionTypes from '../action';

const initialState = {
    lat: null,
    lan: null
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_COOR: 
        return {
            ...state,
            lat: action.lat,
            lan: action.lan

        }
    //     case actionTypes.DELETE_RESULT:
    //         // const id = 2;
    //         // const newArray = [...state].results;
    //         const updatedArray = state.results.filter(result => result.id !== action.resElId);
    //         return {
    //             ...state,
    //             results: updatedArray
    //         }
    // }

    
    }
    return state;
}

export default reducer