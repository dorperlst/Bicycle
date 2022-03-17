     
import React,{useReducer, useContext} from 'react'
import axios from 'axios'
import BicycleContext from './bicycleContext'
import BicycleReducer from './bicycleReducer'
import { GET_BICYCLES, SEARCH_BICYCLES,  CLEAR_BICYCLES, SET_LOADING, CHANGE_OWNER, SHOW_USERS, HIDE_USERS, ADD_BICYCLE, BICYCLE_ERROR, DELETE_BICYCLE, SET_CURRENT, CLEAR_CURRENT, UPDATE_BICYCLE, FILTER_BICYCLES, CLEAR_FILTER, SET_ALERT, REMOVE_ALERT } from '../types';
import AuthContext from '../auth/authContext';

const  BicycleState = props=>{
  const authContext = useContext(AuthContext)
  const {token} = authContext
  const initialState ={
      current: null,
      filtered: null,
      search: null,
      bicycles: null,
      error:null,
      showUsers:false,
      loading:true
  }

  const [state,dispatch] = useReducer(BicycleReducer, initialState)
  
  const searchBicycles = async ()=>{
    
    try {
      const res =  await axios.get('http://localhost:5300/api/bicycles/list')
      dispatch({
         type: SEARCH_BICYCLES, 
         payload: res.data
      }) 
    } 
    catch (error) {
       
      dispatch({
        type: BICYCLE_ERROR, 
        payload: error.response.msg
     }) 
    }
  }


  const getBicyclesList = async ()=>{
    
    try {
      const res =  await axios.get('http://localhost:5300/api/bicycles/list')
      dispatch({
         type: GET_BICYCLES, 
         payload: res.data
      }) 
    } 
    catch (error) {
       
      dispatch({
        type: BICYCLE_ERROR, 
        payload: error.response.msg
     }) 
    }
  }
     const hideUsers = async ()=>{
      
      dispatch({
        type: HIDE_USERS, 
         
     }) 
    }

  const getBicycles = async ()=>{
      const config = {
        headers : {
          "authorization" : token
        }
      }
      try {
        const res =  await axios.get('http://localhost:5300/api/bicycles', config)
        dispatch({
           type: GET_BICYCLES, 
           payload: res.data
        }) 
      } 
      catch (error) {
        dispatch({
          type: BICYCLE_ERROR, 
          payload: error.response? error.response.msg : ""
       }) 
      }
    }
    
    const setLoading = ()=>{ dispatch({ type: SET_LOADING }) }

    const showUsersList = ()=>{ dispatch({ type: SHOW_USERS }) }

    const addBicycle = async bicycle=>{
      const config = {
        headers : {
            'Content-type' : 'application/json',
            "authorization" : token
        }
      }
      try {
        const res =  await axios.post('http://localhost:5300/api/bicycles', bicycle, config)
        dispatch({
           type: ADD_BICYCLE, 
           payload: res.data
        }) 
      } 
      catch (error) {
        dispatch({
          type: BICYCLE_ERROR, 
          payload: error.response.msg
       }) 
      }
    }
    
    const clearBicycles = id =>{
      dispatch({type: CLEAR_BICYCLES, payload:id})
    }

    
    const deleteBicycle = async id =>{
        const config = {
          headers : {
              'Content-type' : 'application/json',
              "authorization" : token
          }
        }
        try {

          const res =  await axios.delete(`http://localhost:5300/api/bicycles/${id}`, config)
          dispatch({
             type: DELETE_BICYCLE, 
             payload: id
          }) 
        } 
        catch (error) {
          dispatch({
            type: BICYCLE_ERROR, 
            payload: error.response.msg
         }) 
        }
    }
    const setCurrent = bicycle =>{
      dispatch({type: SET_CURRENT, payload:bicycle})
    }

    const clearCurrent = () =>{
      dispatch({type: CLEAR_CURRENT})
    }

    const updateBicycle = async bicycle =>{
      const config = {
        headers : {
            'Content-type' : 'application/json',
            "authorization" : token
        }
      }
      try {
        const res =  await axios.put(`http://localhost:5300/api/bicycles/${bicycle._id}`, bicycle, config)
        dispatch({
           type: UPDATE_BICYCLE, 
           payload: res.data
        }) 
      } 
      catch (error) {
        dispatch({
          type: BICYCLE_ERROR, 
          payload: error.response.msg
       }) 
      }
    }

    const changeOwner = async (id, userId) =>{
      // setLoading();
      const config = {
        headers : {
          'Content-Type': 'application/json',
          "authorization" : token,
          // 'Access-Control-Allow-Methods':'*',
          // 'Access-Control-Allow-Origin':'*',
          // 'Accept':'*/*',
          // "Accept-Encoding":"gzip, deflate, br"
        }
      }

      const headers = {
        'Content-Type': 'application/json',
        "authorization" : token,
        // 'Access-Control-Allow-Methods':'*',
        // 'Access-Control-Allow-Origin':'*',
        // 'Accept':'*/*',
        
      }

      try {
         const res =  await axios.post(`http://localhost:5300/api/bicycles/changeOwner/${id}`, 
              {userId: userId}, {headers: headers })

         dispatch({
           type: CHANGE_OWNER, 
           payload: res.data
        }) 
      } 
      catch (error) {
        dispatch({
          type: BICYCLE_ERROR, 
          payload: error
       }) 
      }
    }

    const filterBicycles = text =>{
      dispatch({type: FILTER_BICYCLES, payload:text})
    }

    const clearFilter = () =>{
      dispatch({type: CLEAR_FILTER})
    }

    return  <BicycleContext.Provider
                value={{
                    bicycles: state.bicycles,
                    current: state.current,
                    filtered: state.filtered,
                    error: state.error,
                    showUsers: state.showUsers,
                    search: state.search,
                    showUsersList,
                    setLoading,
                    addBicycle,
                    deleteBicycle,
                    clearBicycles,
                    setCurrent,
                    clearCurrent,
                    updateBicycle,
                    filterBicycles,
                    clearFilter,
                    getBicycles,
                    getBicyclesList,
                    changeOwner,
                    hideUsers,
                    searchBicycles,
                    
                 }}

            >{props.children}
            </BicycleContext.Provider> 
}
export default BicycleState
