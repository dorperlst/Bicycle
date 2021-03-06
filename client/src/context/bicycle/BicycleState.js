     
import React,{useReducer, useContext} from 'react'
import axios from 'axios'
import BicycleContext from './bicycleContext'
import BicycleReducer from './bicycleReducer'
import { GET_BICYCLES, SEARCH_BICYCLES, CLEAR_BICYCLES, SET_LOADING,
          CHANGE_OWNER, SHOW_USERS, HIDE_USERS, ADD_BICYCLE, BICYCLE_ERROR,
          DELETE_BICYCLE, SET_CURRENT, CLEAR_CURRENT, UPDATE_BICYCLE,
          FILTER_BICYCLES, CLEAR_FILTER } from '../types';
import AuthContext from '../auth/authContext';

const  BicycleState = props=>{
  const authContext = useContext(AuthContext)
  const {token} = authContext

  const initialState ={
      current: null,
      filtered: null,
      bicycles: null,
      error:null,
      showUsers:false,
      loading:true
  }

  const [state,dispatch] = useReducer(BicycleReducer, initialState)
  
  const config = {
    headers : {
        'Content-type' : 'application/json',
        "authorization" : token,
        timeout: 10
    }
  }
  const url = `${window.location.protocol}//${window.location.hostname}:5000`

  const searchBicycles = async ()=>{
    
    try {
      
      
      const res =  await axios.get(`${url}/api/bicycles/list`)
      dispatch({
         type: SEARCH_BICYCLES, 
         payload: res.data
      }) 
    } 
    catch (error) {
       
      dispatch({
        type: BICYCLE_ERROR, 
        payload: error.msg
     }) 
    }
  }

  

  const hideUsers = async ()=>{
    dispatch({
      type: HIDE_USERS, 
        
    }) 
  }

  const getBicycles = async ()=>{
     
      try {
        const res =  await axios.get(`${url}/api/bicycles`, config)
        dispatch({
           type: GET_BICYCLES, 
           payload: res.data
        }) 
      } 
      catch (error) {
        dispatch({
          type: BICYCLE_ERROR, 
          payload: error.response? error.msg : ""
       }) 
      }
    }
    
    const setLoading = ()=>{ dispatch({ type: SET_LOADING }) }

    const showUsersList = ()=>{ dispatch({ type: SHOW_USERS }) }

    const addBicycle = async FormData=>{
     
      try {
        const res =  await axios.post(`${url}/api/bicycles`, FormData, config)
        dispatch({
           type: ADD_BICYCLE, 
           payload: res.data
        }) 
      } 
      catch (error) {
        dispatch({
          type: BICYCLE_ERROR, 
          payload: error.msg
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

          await axios.delete(`${url}/api/bicycles/${id}`, config)
          dispatch({
             type: DELETE_BICYCLE, 
             payload: id
          }) 
        } 
        catch (error) {
          dispatch({
            type: BICYCLE_ERROR, 
            payload: error.msg
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
     
      try {
        const res =  await axios.put(`${url}/api/bicycles/${bicycle._id}`, bicycle, config)
        dispatch({
           type: UPDATE_BICYCLE, 
           payload: res.data
        }) 
      } 
      catch (error) {
        dispatch({
          type: BICYCLE_ERROR, 
          payload: error.msg
       }) 
      }
    }

    const changeOwner = async (id, userId) =>{
      // setLoading();
      

      try {
         const res =  await axios.post(`${url}/api/bicycles/changeOwner/${id}`, 
              {userId: userId}, config)

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
      if(text.length>2)
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
                    changeOwner,
                    hideUsers,
                    searchBicycles,
                 }}

            >{props.children}
            </BicycleContext.Provider> 
}
export default BicycleState
