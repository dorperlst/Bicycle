import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, SET_LOADING,
    LOGIN_SUCCESS,LOGIN_FAIL, LOGOUT, CLEAR_ERRORS } from '../types';
export default(state, action)=>{
    switch (action.type){
         
        case SET_LOADING:
            return{ ...state,  loading:true}
        case USER_LOADED:
            return{ ...state, isAuthenticated :true, loading:false, user:action.payload}
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token, 6000000)
            return{
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case LOGOUT:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return{ ...state, error :null}

        default: return state
    }
}


