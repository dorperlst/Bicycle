import { ADD_BICYCLE, GET_BICYCLES, CLEAR_BICYCLES, DELETE_BICYCLE, SET_CURRENT, CLEAR_CURRENT, UPDATE_BICYCLE, FILTER_BICYCLES, CLEAR_FILTER, SET_ALERT, REMOVE_ALERT, BICYCLE_ERROR } from '../types';
export default (state,action)=>{
    switch(action.type){
        case ADD_BICYCLE:
            return {...state,
                bicycles:[...state.bicycles, action.payload],
                loading :false
            }
        case GET_BICYCLES:
            return {...state,
                bicycles: action.payload,
                loading :false
            }
        case UPDATE_BICYCLE:
            return {
                ...state,
                bicycles: state.bicycles.map(
                    bicycle => bicycle.id === action.payload.id ? action.payload: bicycle ),
                loading :false
            }
        case DELETE_BICYCLE:
            return {
                ...state,
                bicycles: state.bicycles.filter(bicycle => bicycle._id !== action.payload),
                loading :false
            }
             
         case CLEAR_BICYCLES:
            return {
                ...state,
                bicycles: null,
                error :false,
                filtered: null,
                current :null
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
            
        case CLEAR_CURRENT:
            return {
                ...state,
                current:null
            }

        case FILTER_BICYCLES:
            return {
                ...state,
                filtered:state.bicycles.filter(bicycle=>{
                    const regex = new RegExp(`${action.payload}`,'gi')
                    return bicycle.name.match(regex)|| bicycle.email.match(regex)
                
                })
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered:null
            }
        case BICYCLE_ERROR:
        return {
            ...state,
            error:action.payload
        }
        default:
            return state
    }
}