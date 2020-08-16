import * as actionTypes from '../action';
import axios from 'axios';

const initialState = {
    city: '',
    current: null,
    forecastArray: null,
    celsius: false,
    tempFav: null,
    favorites: (localStorage.getItem('HeroloFavorites') === null) ? [] : JSON.parse(localStorage.getItem('HeroloFavorites'))

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CITY:
            console.log(action.value);
            return {
                ...state,
                city: action.value,
            }
            case actionTypes.SET_FORECAST:
                console.log(action.value);

                return {
                    ...state,
                    forecastArray: action.value
                }
                case actionTypes.TOGGLE_DEGREE:

                    return {
                        ...state,
                        celsius: state.celsius ? false : true
                    }
                    case actionTypes.SET_CURRENT:
                        return {
                            ...state,
                            current: action.value
                        }
                        case actionTypes.UPDATE_FAVORITES:
                            const temp = state.tempFav;
                            const oldFavorite = state.favorites;
                            const newoldoldFavorite = oldFavorite.concat(temp);
                            localStorage.setItem('HeroloFavorites', JSON.stringify(newoldoldFavorite));
                            return {
                                ...state,
                                favorites: state.favorites.concat(temp)

                            }
                            case actionTypes.ADD_TEMP_OBJ:
                                return {
                                    ...state,
                                    tempFav: action.value

                                }
                                case actionTypes.DELETE_FAVORITE:
                                    const updatedArray = state.favorites.filter(favorites => favorites.id !== action.resElId);
                                    localStorage.setItem('HeroloFavorites', JSON.stringify(updatedArray));
                                    return {
                                        ...state,
                                        favorites: updatedArray
                                    }

    }

    return state;
}

export default reducer