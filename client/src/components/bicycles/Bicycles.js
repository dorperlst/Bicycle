import React,{ useContext, useEffect} from 'react'
import { Fragment } from 'react'
import BicycleContext from '../../context/bicycle/bicycleContext'
import { BicycleItem } from './BicycleItem'
import Spinner from '../layout/Spinner'

import { CSSTransition, TransitionGroup } from 'react-transition-group'
 
const Bicycles = () =>  {
    const bicycleContext = useContext(BicycleContext)

    const{ bicycles, filtered, getBicycles, loading} = bicycleContext
    useEffect(() => {
       getBicycles()
     //eslint-disable-next-line
    }, [])

    if(bicycles!== null && bicycles.length === 0  &&! loading)
        return <h3>Please Add Bicycle</h3>
    return (
        <Fragment>
            {bicycles !==null &&!loading ? ( <TransitionGroup>
                {filtered!==null?  
                    filtered.map(bicycle=>(
                        <CSSTransition key={bicycle._id} timeout={1500} className="item">
                            <BicycleItem key={bicycle._id} bicycle={bicycle} />
                        </CSSTransition> )):

                    bicycles.map(bicycle=>(
                        <CSSTransition key={bicycle._id} timeout={1500} className="item">
                            <BicycleItem key={bicycle._id} bicycle={bicycle} /> 
                        </CSSTransition> ))           
                }
            </TransitionGroup>):<Spinner/>}
           
           </Fragment>
          
    )
}
export default Bicycles
