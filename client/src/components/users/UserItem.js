import React, {useContext, Fragment} from 'react'
import PropTypes from 'prop-types'
import BicycleContext from '../../context/bicycle/bicycleContext'
import UserContext from '../../context/user/userContext'
import '../../style/users.css';
import Spinner from '../layout/Spinner'

export const UserItem = ({user}) => {
    const bicycleContext = useContext(BicycleContext) 
    const userContext = useContext(UserContext) 
    const {setLoading, loading} = userContext
    const {current, clearCurrent, changeOwner} = bicycleContext
    const{id, name, email} = user

    const onClick = async  (userId)=>{
        setLoading(true);

        if (window.confirm(`Bicycle number ${current.code} will register under ${name}`)) {
            clearCurrent();
            changeOwner(current._id, userId)     
        }
        else
            setLoading(false);

    }

    return (

        <Fragment>
        {!loading ? (  
            <div  onClick={() => onClick(user._id)}  className='elem card bg-light'>
                   <img src="https://randomuser.me/api/portraits/men/32.jpg"
                            alt={name} className="__picture"/>
                    <span className="__name">{name}</span>
                    <span className="__value">{email}</span>
            </div>
            ):<Spinner/>}

 



    </Fragment>

        



 
     )
}
UserItem.propTypes={
    user:PropTypes.object.isRequired,
}
