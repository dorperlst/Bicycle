import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext'
import { Navigate } from "react-router-dom";

 

const PrivateRoute = ({ children }) => {

  
  const authContext = useContext(AuthContext)
   
  const {loadUser, loading, isAuthenticated} = authContext

  const authed = isAuthenticated && !loading
  return authed?  children : <Navigate to="/login" />;
  }
 
export default PrivateRoute