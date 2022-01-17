import React,{useState, useContext, useEffect} from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'
import { useNavigate } from "react-router-dom";
const Register = props => {
    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)
    const {setAlert} = alertContext
    const {register, error, clearErrors, isAuthenticated} = authContext
    const navigate = useNavigate();
    
    useEffect(() => {
        if(isAuthenticated)
        {
           navigate('/');
        }
         
        if(error !== undefined && error !== null && error.message !== ''){
            setAlert(error.message, "danger")
            clearErrors()
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
         name: 'doron',
         email: 'dorperlst@gmail.com',
         password: '111111',
         password2: '111111'
    })
    const onChange = e => setUser({...user, [e.target.name]:e.target.value})
  
    const onSubmit = async e => {
        e.preventDefault()
 
        if(name==='' || password==='' || email===''){
            setAlert('Please Enter all fields', 'danger')
        }
        else if(password !== password2)
            setAlert('Password do not match', 'danger')
        else
        {

            try
            {

                var res = await register({ name, email, password  })
                // if(res==undefined)
                // {
                //     setAlert('Email Allready in use', 'danger')

                // }
            //    else
            //    {
                    
            //         setUser({  name: '',
            //             email: '',
            //             password: '',
            //             password2: '' })
            //    }

            }
            catch(error)
            {
                console.log ("error"+ error)

            }
            
           
        }        
    }
    const {  name, email, password, password2} = user
    return (
        <div className='form-container'>
      
            <h1>Account <span className='text-primary'>Register</span>   </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input name="name" required value={name} onChange={onChange} type="text"/>
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input name="email" required value={email} onChange={onChange} type="text"/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input name="password" required minLength={6}  required value={password} onChange={onChange} type="password"/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password2'>Confirm Password</label>
                    <input name="password2" required minLength={6} value={password2} onChange={onChange} type="password"/>
                </div>
                <input type="submit" value="Register" className='btn btn-primary btn-block' />   
            </form>
           
        </div>
    )
}
export default Register