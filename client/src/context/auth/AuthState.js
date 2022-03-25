     
import React,{useReducer} from 'react'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import {  REGISTER_FAIL, REGISTER_SUCCESS,SET_LOADING, USER_LOADED, LOGIN_SUCCESS,
            LOGIN_FAIL, LOGOUT, CLEAR_ERRORS  } from '../types';

const  AuthState =   (props) => {
    const initialState ={
        token: localStorage.token,
        isAuthenticated: false,
        loading: null,
        error: null,
        user: {
            name: '',
            email: '',
            password: '',
            password2: ''
       }
    }
    
   
    const [state,dispatch] = useReducer(AuthReducer, initialState)

    const  loadUser = async()=>{
      

        var err = null
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
               
                var res = await axios.get(api , { headers: {"authorization" : localStorage.token ,timeout: 10} })
                if(res.status === 200)
                    dispatch({
                        type: USER_LOADED, 
                        payload: res.data
                        }) 
                else
                    dispatch({
                        type: REGISTER_FAIL, 
                        payload: "Unknown Error"
                    }) 
                 
            }
        } catch (error) {
         
            dispatch({
                type: REGISTER_FAIL, 
                payload: err
            }) 
        }
    };
    const  logout = () => dispatch({type: LOGOUT});
    const  setLoading = () => dispatch({type: SET_LOADING});

    
    const  clearErrors = () => dispatch({type: CLEAR_ERRORS});

    const register = async FormData =>{
        const config = { headers : {'Content-type' : 'application/json' ,
        "encType" :"multipart/form-data"
    } }
        try {
            const res =  await axios.post('http://localhost:5000/api/users', FormData, config)
            dispatch({
               type: REGISTER_SUCCESS, 
               payload: res.data
            }) 
            loadUser()
        }
        catch (error) {
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
 
            await loadUser()
        } 
        catch (error) {
            console.log(error)

            dispatch({
                type: LOGIN_FAIL, 
                payload: error
            }) 
        }
    }
    // if(localStorage !== null ) 
    //     loadUser()
    return  <AuthContext.Provider
                value={{
                    token: state.token,
                    isAuthenticated: state.isAuthenticated,
                    loading:state.loading,
                    user: state.user,
                    error: state.error,
                    register,
                    login,
                    logout,
                    loadUser,
                    clearErrors,
                    setLoading

                 }}

            >{props.children}
            </AuthContext.Provider> 
}
export default AuthState
