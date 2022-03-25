import React, {useContext, Fragment} from 'react'
import PropTypes from 'prop-types'
import BicycleContext from '../../context/bicycle/bicycleContext'
import Spinner from '../layout/Spinner'
 
export const BicycleItem = ({bicycle}) => {
    const bicycleContext = useContext(BicycleContext) 
    const {deleteBicycle, setCurrent, clearCurrent, loading} = bicycleContext
    const{_id, code,image } = bicycle
    var  imgUrl= "https://yt3.ggpht.com/ytc/AKedOLTyY_9cCpdISK7W7qU5g7LiLQTRMk6-o_PJZKQ1=s900-c-k-c0x00ffffff-no-rj"
    try
    {
        if( image !=="")
            imgUrl=  require(`../../uploads/${image}`)

    }
    catch(e){
           imgUrl= "https://d3ecqbn6etsqar.cloudfront.net/dsZVfAQClssJ9ZI0kfyL8j-LYvg=/378706.jpg"    
    }

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
                    <img src={imgUrl} alt={code} className="__picture"/>

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
