import React,{ useContext} from 'react'
 import BicycleContext from '../../context/bicycle/bicycleContext'

const userStyle = {
    display:"grid" ,
    gridTemplateColumns:'repeat(3, 1fr)',
    gridGap:'1 rem'
}  

const users = () =>  {
    const bicycleContext = useContext(BicycleContext)
    const{ users} = bicycleContext
           return (
            <div className="container">
                
                <div style={userStyle                                                                   }>
                    {users.map(user=>(
                          <div>{user.id}{user.name} </div>
                    ))}
                </div>
            </div>
        )
    
}

 
export default users
