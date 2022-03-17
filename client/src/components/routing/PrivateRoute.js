import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext'
import { Navigate } from "react-router-dom";
import Spinner from '../layout/Spinner';

const PrivateRoute = ({ children }) => {
//   useEffect(() => {
//     if(isAuthenticated)
//     {
//       return authed?  children
//     }
//     if(error !== undefined && error !== null && error !== ''){
//         setAlert(error.message, "danger")
//         clearErrors()
//     }
//     //eslint-disable-next-line
// }, [error, isAuthenticated, token])

    const authContext = useContext(AuthContext)
    const {loading, isAuthenticated, token} = authContext
    const authed = isAuthenticated && !loading

    return ( 
      loading !== false && token !== null && token !== undefined ? <Spinner/> : authed?  children : <Navigate to="/login" />
    )
  }
 
export default PrivateRoute