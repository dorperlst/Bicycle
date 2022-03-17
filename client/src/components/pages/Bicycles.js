import React, {useContext, useEffect}   from 'react'
import BicyclesList from '../bicycles/BicyclesList';
import BicycleFilter from '../bicycles/BicycleFilter';

export default function Bicycles() {
  
    return (
        <div>
            <BicycleFilter/>
            <BicyclesList />
        </div>
    )
}
