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

    }
    return state;
}

export default reducer