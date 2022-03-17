import React, {useContext, useEffect}   from 'react'
import Bicycles from '../bicycles/Bicycles';
import BicycleForm from '../bicycles/BicycleForm';
import BicycleFilter from '../bicycles/BicycleFilter';
import BicycleContext from '../../context/bicycle/bicycleContext';
import Users from './Users';

export default function Home() {
    const {showUsers} = useContext(BicycleContext)
    return (
        <div className='grid-2 '>
            <div>
                <BicycleForm  />
            </div>
            <div> 
                {showUsers  && <Users/>}
                {!showUsers  && <Bicycles/>}  
            </div>
        </div>
    )
}
