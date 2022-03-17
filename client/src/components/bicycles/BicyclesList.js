import React,{ useContext, useEffect} from 'react'
import { Fragment } from 'react'
import BicycleContext from '../../context/bicycle/bicycleContext'
import { BicycleListItem } from './BicycleListItem'
import Spinner from '../layout/Spinner'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
 
const BicyclesList = () =>  {
    const bicycleContext = useContext(BicycleContext)
    var disable = true 
    const{ bicycles, search, filtered, getBicyclesList, searchBicycles, loading} = bicycleContext
    useEffect(() => {
        searchBicycles()
      //eslint-disable-next-line
    }, [])

    

    if(search!== null && search.length === 0  &&! loading)
        return <h3>Please Add Bicycle</h3>
    return (
        <div disabled= {loading  && "disabled"}>  
        {search !== null && !loading ? ( <TransitionGroup>
            {filtered!==null?  
                filtered.map(bicycle=>(
                    <CSSTransition   timeout={1500} className="item">
                        <BicycleListItem  key={bicycle.code}  bicycle={bicycle} />
                    </CSSTransition> )):

                search.map(bicycle=>(
                         <BicycleListItem  key={bicycle.code} bicycle={bicycle} /> 
                ))           
            }
        </TransitionGroup>):<Spinner/>}
       </div>
          
    )
}
export default BicyclesList
