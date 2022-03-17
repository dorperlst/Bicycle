import { ADD_BICYCLE, SEARCH_BICYCLES, CHANGE_OWNER, SHOW_USERS, HIDE_USERS, GET_BICYCLES, CLEAR_BICYCLES, DELETE_BICYCLE, SET_CURRENT, CLEAR_CURRENT, UPDATE_BICYCLE, FILTER_BICYCLES, CLEAR_FILTER, SET_ALERT, REMOVE_ALERT, BICYCLE_ERROR, SET_LOADING } from '../types';
export default (state,action)=>{
    switch(action.type){
        case SET_LOADING:
            return {...state,
                 loading :true,
            }

        case ADD_BICYCLE:
            return {...state,
                bicycles:[...state.bicycles, action.payload],
                loading :false,
                current :null
            }
        case HIDE_USERS:
                return { 
                    ...state,
                    showUsers: false,
                    loading: false
                }     
        case SHOW_USERS:
            return { 
                ...state,
                showUsers: true
            } 
        case CHANGE_OWNER:
            return { 
                ...state,
                bicycles: state.bicycles.filter(bicycle => bicycle._id !== action.payload),
                showUsers:false, 
                loading :false
            }    
        case GET_BICYCLES:
            return {...state,
                bicycles: action.payload,
                loading :false
            }
        case SEARCH_BICYCLES:
            return {...state,
                search: action.payload,
                loading :false
            }
        case UPDATE_BICYCLE:
            return {
                ...state,
                bicycles: state.bicycles.map(
                    bicycle => bicycle._id === action.payload._id ? action.payload: bicycle ),
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
                showUsers:false,
                current:null
            }

        case FILTER_BICYCLES:
            return {
                ...state,
                filtered:state.bicycles.filter(bicycle=>{
                    const regex = new RegExp(`${action.payload}`,'gi')
                    return bicycle.code.match(regex) 
                
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
                loading:false,
                bicycles:[],
                error:action.payload
            }
        default:
            return state
    }
}