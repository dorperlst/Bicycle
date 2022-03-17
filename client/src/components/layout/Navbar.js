import React ,{useContext, Fragment} from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
 
const Navbar  = ({icon, title}) =>     {
    const authContext = useContext(AuthContext)    
    const {logout, token, loadUser, user, isAuthenticated} = authContext
    const needLoading = !isAuthenticated && token !== null && token !== "null" && token !== undefined
    if(needLoading)
        loadUser()
    const onLogout = () => logout();

    const authLinks =(
        <Fragment>   
            <li><Link to="/myBicycle" >Home</Link></li>

            { user && (<li> Hello {user.name}</li>) }
            <li>
                <a onClick={onLogout} href='#!'>
                    <span className='hide-sm'>Logout</span>
                    <i className='fas fa-sign-out-alt'></i> 
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
            <h1> <i className ="fal fa-bicycle"></i> {title} </h1>
            <ul>
                <li><Link to="/" >Search</Link></li>

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
