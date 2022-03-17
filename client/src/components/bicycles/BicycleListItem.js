import React, {useContext} from 'react'
import PropTypes from 'prop-types'
 
export const BicycleListItem = ({bicycle}) => {
    const{ code, user, _id, id} = bicycle
    return (
        <div key={_id   } className='card bg-light'>
            <h3 className='text-primary text-left'>
                {code}{' '} {_id}
            </h3>
            <div>{user.name}{' '}  {user.email}
            </div>
          </div>
     )
}
BicycleListItem.propTypes={
    bicycle:PropTypes.object.isRequired,
}
