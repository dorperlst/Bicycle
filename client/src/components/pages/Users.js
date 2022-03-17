import React, {useContext, useEffect}   from 'react'
import UsersList from '../users/Users';
import UserFilter from '../users/UserFilter';
import '../../style/users.css';
import BicycleContext from '../../context/bicycle/bicycleContext';



export default function Users() {
    const bicycleContext = useContext(BicycleContext)
    const {hideUsers} = bicycleContext

    const closeUsers=()=>{
        hideUsers()
    }
    return (
        <div  >
            <i onClick={closeUsers}   className="far fa-window-close"></i>
            <UserFilter/>
            <UsersList />
        </div>
    )
}
