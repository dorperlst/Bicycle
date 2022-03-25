import React,{ useContext, useEffect} from 'react'
import { Fragment } from 'react'
import BicycleContext from '../../context/bicycle/bicycleContext'
import { BicycleListItem } from './BicycleListItem'
import Spinner from '../layout/Spinner'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
 
const BicyclesList = () =>  {
    const bicycleContext = useContext(BicycleContext)
    
    var disable = true 
    const{ bicycles, filtered, searchBicycles, loading} = bicycleContext
    //
    useEffect(() => {
       
        searchBicycles()
      //eslint-disable-next-line
    }, [])

    

    if(bicycles!== null && bicycles.length === 0  &&! loading)
        return <h3>No Bicycle Found</h3>
    return (
        <div disabled= {loading  && "disabled"}>  
        {bicycles !== null && !loading ? ( <TransitionGroup>
            {
            filtered!==null?  
                filtered.map(bicycle=>(
                    <CSSTransition  key={bicycle.code} timeout={1500} className="item">
                        <BicycleListItem    bicycle={bicycle} />
                    </CSSTransition> ))
                    :
                    bicycles.map(bicycle=>(
                        <CSSTransition key={bicycle._id} timeout={1500} >
                            <BicycleListItem   bicycle={bicycle} /> 
                        </CSSTransition> ))            
            }
        </TransitionGroup>):<Spinner/>}
       </div>
          
    )
}
export default BicyclesList
