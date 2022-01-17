import React ,{useContext, Fragment} from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar  = ({icon, title}) =>     {
    const authContext = useContext(AuthContext)    
    const {logout, user, isAuthenticated} = authContext
    const onLogout = ()=>{
        logout();
    }
    const authLinks =(
        <Fragment>
            {user&&(<li> hello {user.name}</li>)}
            <li>
                <a onClick={onLogout} href='#!'>
                    <i className='fas fa-sign-out-alt'></i> 
                    <span className='hide-sm'>Logout</span>
                </a> 
            </li>
        </Fragment>)
    const guestLinks =(
    <Fragment>
            <li><Link to="/login" >Login</Link></li>
            <li><Link to="/register" >Register</Link></li>
    </Fragment>)



    return (
        <nav className="navbar bg-primary" >
            <h1>  <i className={icon}></i> { title}</h1>
            <ul>
                {/* <li><Link to="/" >Home</Link></li>
                <li><Link to="/about" >About</Link></li> */}
                {isAuthenticated ? authLinks : guestLinks}

            </ul>
        </nav>
    )
}

Navbar.defaultProps={
    title:'Bicycle  Keeper',
    icon:'fab fa-id-card-alt '
};
Navbar.propTypes={
    title:PropTypes.string.isRequired,
    icon:PropTypes.string.isRequired
}
 
export default Navbar
