import React, {useContext, useEffect}   from 'react'
import Bicycles from '../bicycles/Bicycles';
import BicycleForm from '../bicycles/BicycleForm';
import BicycleFilter from '../bicycles/BicycleFilter';
import AuthContext from '../../context/auth/authContext';
 
export default function Home() {
    const authContext = useContext(AuthContext)
    const {loadUser, isAuthenticated} = authContext
 
    // useEffect(() => {
    //     alert("loginuseEffect")
    //     if(isAuthenticated)
    //     {
    //         navigate('/');
    //     }
        
    //     //eslint-disable-next-line
    // }, [error, isAuthenticated])
    return (
        
        <div className='grid-2'>
            <div>
                <BicycleForm/>
            </div>
            <div> 
                <BicycleFilter/>
                <Bicycles />
            </div>
            
        </div>
    )
}
