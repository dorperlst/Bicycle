import React ,{useContext, Fragment} from 'react';
import PropTypes from 'prop-types'
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
            <li><a href= "/myBicycle">Home</a></li>

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
            <li><a href ="/login" >Login</a></li>
            <li><a href ="/register" >Register</a></li>
        </Fragment>)

    return (
        <nav className="navbar bg-primary" >
            <h1> <i className ="fal fa-bicycle"></i> {title} </h1>
            <ul>
                <li><a href= "/">Search</a></li>

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
