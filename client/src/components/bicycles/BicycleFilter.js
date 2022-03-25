import React,{ useEffect, useContext, useRef} from 'react'

import BicycleContext from '../../context/bicycle/bicycleContext';

const BicycleFilter = () => {
    const bicycleContext= useContext(BicycleContext)
    const {filterBicycles, setLoading, clearFilter, filtered} = bicycleContext
    const text = useRef('')
 
    useEffect(() => {

        if(filtered === null){
            text.current.value = ''
        }

    })
     
    const onChange = e =>{
        if(text.current.value != '')
        {
            filterBicycles(e.target.value)
        }
        else
            clearFilter()
        }
        return (
            <form >
                <input ref={text} type="text" className="form-control"  placeholder='Filter Bicycles' onChange={onChange}/>            
            </form>
        )
}
export default BicycleFilter
