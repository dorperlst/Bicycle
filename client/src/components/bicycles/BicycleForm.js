import React,{useState, useEffect,Fragment, useContext} from 'react'

import BicycleContext from '../../context/bicycle/bicycleContext';
import UserContext from '../../context/user/userContext'
import validator from 'validator';

const BicycleForm = () => {
    const bicycleContext= useContext(BicycleContext)
    const userContext = useContext(UserContext) 

    const {current, addBicycle, showUsersList, clearCurrent, updateBicycle} = bicycleContext
    const {filterUsers, users} = userContext

    const [bicycle, setBicycle] = useState({})
    const{code} = bicycle;
    
    useEffect(() => {

        if(current !== null){
             setBicycle(current)
        }
        else
            setBicycle({ 
                id : '',
                code :"",
            })

    }, [current])

    const onChangeOwner =(e)  =>  
    {
        e.preventDefault()
        showUsersList()
    }

    const onSubmit = e =>{
        e.preventDefault()
        current === null? addBicycle(bicycle): updateBicycle(bicycle)
        clearCurrent()
        setBicycle({
            code:''          
        })
    }

    const clearAll = (e) =>{
        e.preventDefault();
        clearCurrent()
        
    }

    const onChange = (e) => 
    {
             setBicycle({
            ...bicycle, [e.target.name]:e.target.value
        })
    }
    return (
        <div> 
                        
            <form onSubmit={onSubmit}>
                <h2 className="text-primary">{(!current )? "Add Bicycle" : "Edit Bicycle" }</h2>

                <input type="text" placeholder="Code" className="form-control" required minLength="5" name="code" value={code} onChange={onChange}/>
                 <p className='addBicycle'>
                    <button type="submit"  
                         className="btn btn-outline-primary">{(!current) ? "Add Bicycle" : "Update Bicycle" } </button>
                </p>
  
                { (current!==null )&&
                    <p> 
                        <button type="button" onClick={clearAll} className="btn btn-outline-warning">Clear</button>
                        <button type="button" onClick={onChangeOwner}  className="btn btn-outline-danger">Change Owner</button>
                    </p>
                   }
            </form>
          </div>

    )
}
export default BicycleForm
