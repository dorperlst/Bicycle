
import React,{useState, useContext, useEffect} from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'
import { useNavigate } from "react-router-dom";
import '../../style/login.css';
 
const Register = props => {
    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)
    const {setAlert} = alertContext
    const {register, error, clearErrors, isAuthenticated} = authContext
    const navigate = useNavigate();
    
    useEffect(() => {
        if(isAuthenticated)
        {
           navigate('/myBicycle');
        }
         
        if(error !== undefined && error !== null && error.message !== ''){
            setAlert(error.message, "danger")
            clearErrors()
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated])

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
               await register({ name, email, password  })
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
        <div id="second">
            <div className="myform form ">
                <div className="logo mb-3">
                    <div className="col-md-12 text-center">
                    <h1 >Signup</h1>
                </div>
            </div>
                <form onSubmit={onSubmit} name="registration">
                    <div className="form-group">
                        <label htmlFor='name'>Name</label>
                        <input name="name" required className="form-control"  value={name} onChange={onChange} placeholder="Enter Firstname" type="text"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor='name'>Email</label>
                        <input name="email" id="email"   required className="form-control"  value={email} onChange={onChange} placeholder="Enter Email" type="email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor='password'>Password</label>
                        <input name="password" id="password"  minLength={6}  className="form-control" value={password} onChange={onChange} type="password"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor='password2'>Confirm Password</label>
                        <input name="password2" id="password2"  minLength={6}className="form-control" value={password2} onChange={onChange} type="password"/>
                    </div>
                    <div className="col-md-12 text-center mb-3">
                        <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Register</button>
                    </div>
                    <div className="col-md-12 ">
                        <div className="form-group">
                            <p className="text-center"><a href="#" id="signin">Already have an account?</a></p>
                        </div>
                    </div>
                
                </form>
            </div>
        </div>
            {/* <h1>Account <span className='text-primary'>Register</span>   </h1>
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
            */}
        </div>
    )
}
export default Register




