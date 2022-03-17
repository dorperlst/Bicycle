import { GET_USERS,SET_LOADING, CLEAR_USERS, FILTER_USERS, CLEAR_FILTER, USER_ERROR } from '../types';
export default (state,action)=>{
    switch(action.type){
        case SET_LOADING:
            return {...state,
                 loading :action.payload,
                
            }
        case GET_USERS:
            return {...state,
                users: action.payload,
                loading :false
            }
               
         case CLEAR_USERS:
            return {
                ...state,
                users: null,
                error :false,
                current :null
            }
        
        case FILTER_USERS:
            return {
                ...state,
                users: action.payload,
               
             
            }
        case CLEAR_FILTER:
            return {
                ...state,
                users:null
            }
        case USER_ERROR:
        return {
            ...state,
            loading:false,
            users:[],
            error:action.payload
        }
        default:
            return state
    }
}