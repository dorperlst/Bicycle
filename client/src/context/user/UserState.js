     
import React,{useReducer, useContext} from 'react'
import axios from 'axios'
import UserContext from './userContext'
import UserReducer from './userReducer'
import { FILTER_USERS, SET_LOADING, USER_ERROR } from '../types';
import AuthContext from '../auth/authContext'

const  UserState = props=>{
  const authContext = useContext(AuthContext)
  const {token} = authContext
  const initialState ={
      loading: null,
      error: null,
      users: null,

  }

  const [state,dispatch] = useReducer(UserReducer, initialState)
  const setLoading = async (value)=>{
     dispatch({
      type: SET_LOADING, 
      payload: value
   }) 
  }

  
  const filterUsers = async (term)=>{
    const config = {
      headers : {
        "authorization" : token 
      }
    }
    try {
      const res =  await axios.get(`/api/users/search?term=${term}`, config )
      dispatch({
         type: FILTER_USERS, 
         payload: res.data
      }) 
    } 
    catch (error) {
       
      dispatch({
        type: USER_ERROR, 
        payload: error.msg
     }) 
    }
  }
  
 
  return  <UserContext.Provider
              value={{
                  users:state.users,
                  loading:state.loading,
                  error:state.error,
                  filterUsers,
                  setLoading
                }}

          >{props.children}
          </UserContext.Provider> 
}
export default UserState
