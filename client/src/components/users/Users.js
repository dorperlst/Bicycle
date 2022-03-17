 

import React,{ useContext, useEffect} from 'react'
import { Fragment } from 'react'
import UserContext from '../../context/user/userContext'
 import Spinner from '../layout/Spinner'

import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { UserItem } from './UserItem'
import '../../style/users.css';

const Users = () =>  {
    const userContext = useContext(UserContext)

    const{ users, filterUsers, loading} = userContext
    useEffect(() => {
        filterUsers()
     //eslint-disable-next-line
    }, [])

   
    return (
        <Fragment>
            {users !== null &&!loading ? ( 
                    <div className="__profiles">  
                    {users.length>0 ?  
                        <TransitionGroup>
                            {  
                                users.map(user=>(
                                    <CSSTransition key={user._id} timeout = {1500} className="item">
                                        <UserItem  key={user._id} user = {user} />
                                    </CSSTransition> ))          
                            }
                        </TransitionGroup>:<div>No Users Found</div>}
                    </div>
                
            ):<Spinner/>}
           
           </Fragment>
          
    )
}
export default Users
