import React, {useContext, Fragment} from 'react'
import PropTypes from 'prop-types'
import BicycleContext from '../../context/bicycle/bicycleContext'
import UserContext from '../../context/user/userContext'
import '../../style/users.css';
import Spinner from '../layout/Spinner'
// import img2 from '../../uploads/pexels-photo-2379004-1648202218617.jpeg'
export const UserItem = ({user}) => {
     
    
    const bicycleContext = useContext(BicycleContext) 
    const userContext = useContext(UserContext) 
    const {setLoading, loading} = userContext
    const {current, clearCurrent, changeOwner} = bicycleContext
    const{ name, email, image} = user
    var  imgUrl= "https://yt3.ggpht.com/ytc/AKedOLTyY_9cCpdISK7W7qU5g7LiLQTRMk6-o_PJZKQ1=s900-c-k-c0x00ffffff-no-rj"
    try
    {
        if( image !=="")
            imgUrl=  require(`../../uploads/${image}`)

    }
    catch(e){
           imgUrl= "https://yt3.ggpht.com/ytc/AKedOLTyY_9cCpdISK7W7qU5g7LiLQTRMk6-o_PJZKQ1=s900-c-k-c0x00ffffff-no-rj"    
    }
            

    const onChangeOwner = async  (userId)=>{
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

                <div  onClick={() => onChangeOwner(user._id)}  className='elem   bg-light'>
                   
                    <div className='info'>
                        <img src={imgUrl} alt={name} className="__picture"/>
                        <span className="__name">{name}</span>
                    </div>
                    <div>
                        <div className="__value">
                            <span >{email}</span>

                        </div>

                    </div>
                </div>
                ):<Spinner/>}
        </Fragment>
     )
}

UserItem.propTypes={
    user:PropTypes.object.isRequired,
}
