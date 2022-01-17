import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import BicycleContext from '../../context/bicycle/bicycleContext'
export const BicycleItem = ({bicycle}) => {
    const bicycleContext =  useContext(BicycleContext) 
    const {deleteBicycle, setCurrent, clearCurrent, current} = bicycleContext
    const{_id, name, email, phone, type} = bicycle
 
    const onDelete=()=>{
        deleteBicycle(_id);
        clearCurrent();
    }
    const onUpdate=()=>{
        
         setCurrent(bicycle)
 
    }

    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {name}{' '} 

                <span style={{float:'right'}} className={'badge '+ (type === 'professional' ? 'badge-success': 'badge-primary')}>
                        { type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className='list'>
                {email&&(<li>   <i className='fas fa-envelope-open'>{email}</i></li>)}
                {phone&&(<li>   <i className='fas fa-phone'>{phone}</i></li>)}
            </ul>
            <p><button  onClick={onUpdate}  className= "btn btn-dark btn-sm">Edit</button></p>
            <p><button   onClick={onDelete}  className ="btn btn-danger btn-sm">Delete</button></p>


        </div>
     )
}
BicycleItem.propTypes={
    bicycle:PropTypes.object.isRequired,
}
