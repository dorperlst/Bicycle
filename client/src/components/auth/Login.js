import React,{useState, Fragment, useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'
import { useNavigate } from "react-router-dom";
import Spinner from '../layout/Spinner'

const Login = (props) => {
    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)
    const {setAlert} = alertContext
    const {login, loadUser, loading, error, clearErrors, isAuthenticated} = authContext
    const navigate = useNavigate();
     useEffect(() => {
        if(isAuthenticated)
        {
            // alert("navigate")
            navigate('/');
        }
         
        if(error !== undefined && error !== null && error !== ''){
            setAlert(error.message, "danger")
            clearErrors()
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated])

    const [user, setUser] = useState({
         email: 'dorperlst@gmail.com',
         password: '111111'
    })

    const onChange = e => setUser({...user, [e.target.name]:e.target.value})
  
    const onSubmit = e =>{
        e.preventDefault()
         if(name === '' || password === '' || email === ''){
            setAlert('Please Enter all fields', 'danger')
        }
        else
        {
            try
            {
                login({ email, password})
            }
            catch(error)
            {
                console.log ("error"+ error)
            }
        }               
    }
    const {  name, email, password} = user
    const needLoading = !isAuthenticated && localStorage.token != null
    if(needLoading)
        loadUser()
    if(loading||needLoading||isAuthenticated)
        return  <Fragment>
        <h2>LOGIN...</h2><Spinner/>
      </Fragment>

       
    return (
        <div className='form-container'>
            <h1>Account <span className='text-primary'>Login</span>   </h1>
            <form onSubmit={onSubmit}>
             
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input name="email"  required value={email} onChange={onChange} type="text"/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input required name="password" value={password} onChange={onChange} type="text"/>
                </div>
                <input type="submit" value="Login" className='btn btn-primary btn-block' />   
            </form>
        </div>
    )
}
export default Login