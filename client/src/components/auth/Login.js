import React,{useState, Fragment, useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'
import { useNavigate } from "react-router-dom";
import Spinner from '../layout/Spinner'
import '../../style/login.css';

const Login = (props) => {
    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)
    const {setAlert} = alertContext
    const {login, loadUser, loading, error, clearErrors, token, isAuthenticated} = authContext
    const navigate = useNavigate();
    
    useEffect(() => {
        if(isAuthenticated)
        {
            
             navigate('/myBicycle');
        }
        if(error !== undefined && error !== null && error !== ''){
            setAlert(error.message, "danger")
            clearErrors()
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated, token])
 
    const [user, setUser] = useState({
         email: 'dorperlst@gmail.com',
         password: '111111'
    })

    const onChange = e => setUser({...user, [e.target.name]:e.target.value})
  
    const onSubmit = e =>{
        e.preventDefault()
        
        
        try
        {
            login({ email: email,
            password: password})
        }
        catch(error)
        {
            console.log ("error"+ error)
        }
                     
    }
    const {name, email, password} = user
 
    return (
        <div className="login">
            <div className="row">
                <div className="col-9 mx-auto">
                <div id="first">
                    <div className="myform form ">
                        <div className="logo mb-3">
                            <div className="col-12 text-center">
                                <h1>Login</h1>
                            </div>
                        </div>
                    <form onSubmit={onSubmit} method="post" name="login">
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email" name="email" value={email} onChange={onChange}  className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" required minLength={6} value={password} onChange={onChange} className="form-control" name="password" id="password"  aria-describedby="emailHelp" placeholder="Enter Password"/>
                            </div>
                            <div className="form-group">
                                <p className="text-center">By signing up you accept our <a href="#">Terms Of Use</a></p>
                            </div>
                            <div className="col-md-12 text-center ">
                                <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Login</button>
                            </div>
                            <div className="col-md-12 ">
                                <div className="login-or">
                                    <hr className="hr-or"/>
                                    <span className="span-or">or</span>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <p className="text-center">Don't have account? <a href="#" id="signup">Sign up here</a></p>
                            </div>
                            </form>
                    
                    </div>
                </div>
               
            </div> </div> 
        </div>   
     
    )
}
export default Login