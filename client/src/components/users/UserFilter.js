import React,{useState, useEffect, useContext, useRef} from 'react'

import UserContext from '../../context/user/userContext';

const UserFilter = () => {
    const userContext= useContext(UserContext)
    const {filterUsers, clearFilter, filtered} = userContext
    const text = useRef('')
 
    useEffect(() => {

        if(filtered === null){
            text.current.value = ''
        }

    })
     
    const onChange = e =>{
        if(text.current.value != '')
            filterUsers(e.target.value)
        else
            clearFilter()
        }
        return (
            <form >
                <input ref={text} type="text" className='form-control' placeholder='Filter Users' onChange={onChange}/>            
            </form>
        )
}
export default UserFilter
