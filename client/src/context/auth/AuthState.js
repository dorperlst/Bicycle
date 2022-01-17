     
import React,{useReducer} from 'react'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import {  REGISTER_FAIL, REGISTER_SUCCESS, SET_LOADING,
USER_LOADED ,
AUTH_ERROR ,
LOGIN_SUCCESS,
LOGIN_FAIL, LOGOUT,  
CLEAR_ERRORS  } from '../types';


const  AuthState =   (props) => {
 
    const initialState ={
        token: localStorage.token ,
        isAuthenticated: false,
        loading: false,
        error: null,
        user: null
    }

    
    const [state,dispatch] = useReducer(AuthReducer, initialState)
    
    const { token,
        isAuthenticated,
        loading,
        error,
        user} = state

    const  loadUser = async()=>{
        try {
            
            if(localStorage.token === null){
                dispatch({
                    type: LOGOUT, 
                    payload: "authorization"
                 }) 
            }
            else
            {
                setAuthToken(localStorage.token )
                const api = 'http://localhost:5000/api/auth'; 
               
                 axios.get(api , { headers: {"authorization" : localStorage.token } })
                .then(res => {
                    dispatch({
                        type: USER_LOADED, 
                        payload: res.data
                     }) 
                    })
            }
            
          
        } catch (error) {
            dispatch ({type: AUTH_ERROR})
            
        }
    };
    const  logout = () => dispatch({type: LOGOUT});
     
    const  clearErrors = () => dispatch({type: CLEAR_ERRORS});

    const register = async FormData =>{
        const config = {
            headers : {
                'Content-type' : 'application/json',
            }

        }
        try {
            const res =  await axios.post('http://localhost:5000/api/users', FormData, config)
            dispatch({
               type: REGISTER_SUCCESS, 
               payload: res.data
            }) 
            loadUser()


        } catch (error) {
            console.log(error)

            dispatch({
                type: REGISTER_FAIL, 
                payload: error
            }) 
        }
    }

    const login = async FormData =>{         
        const config = {
            headers : {
                'Content-type' : 'application/json',
            }

        }
        try {
            const res =  await axios.post('http://localhost:5000/api/auth', FormData, config)
            dispatch({
               type: LOGIN_SUCCESS, 
               payload: res.data
            }) 
 
            loadUser()


        } catch (error) {
            console.log(error)

            dispatch({
                type: LOGIN_FAIL, 
                payload: error
            }) 
        }
    }
     
    return  <AuthContext.Provider
                value={{
                    token: state.bicycles,
                    isAuthenticated: state.isAuthenticated,
                    loading:state.loading,
                    user: state.user,
                    error: state.error,
                    register,
                    login,
                    logout,
                    loadUser,
                    clearErrors

                 }}

            >{props.children}
            </AuthContext.Provider> 
}
export default AuthState
