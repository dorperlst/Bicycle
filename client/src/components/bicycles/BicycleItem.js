import React, {useContext, Fragment} from 'react'
import PropTypes from 'prop-types'
import BicycleContext from '../../context/bicycle/bicycleContext'
import Spinner from '../layout/Spinner'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

export const BicycleItem = ({bicycle}) => {
    const bicycleContext = useContext(BicycleContext) 
    const {deleteBicycle, setCurrent, clearCurrent, loading} = bicycleContext
    const{_id, code, } = bicycle

    const onDelete=()=>{
        setCurrent(bicycle)
        deleteBicycle(_id);
        clearCurrent();
    }

    const onUpdate=()=>{
         setCurrent(bicycle)
    }
    return (
        <Fragment>
            {!loading ? (  
                <div  className='elem card bg-light'>
                    <h3 className='text-primary text-left'>
                        {code}{' '} 
                    </h3>
                    <p> 
                        <button  onClick={onUpdate} type="button" className="btn btn-outline-secondary">Edit</button>
                        <button type="button" onClick={onDelete} className="btn btn-outline-danger">Delete</button>
                    </p>
                </div>
                ):<Spinner/>}
        </Fragment>
    )


 
}
BicycleItem.propTypes={
    bicycle:PropTypes.object.isRequired,
}
