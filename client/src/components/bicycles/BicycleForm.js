import React,{useState, useEffect, useContext} from 'react'

import BicycleContext from '../../context/bicycle/bicycleContext';

const BicycleForm = () => {
    const bicycleContext= useContext(BicycleContext)
    const {current, addBicycle, clearCurrent, updateBicycle} = bicycleContext
    const [bicycle, setBicycle] = useState({})
    // var cont = !bicycle?
    // { 
    //     id : '',
    //     name :"sgsdfg",
    //     email:"sdf@dd.com",
    //     phone:"111-222-555",
    //     type :"personal"
    // }:bicycle

    const{name, email, phone, type} = bicycle;

    useEffect(() => {

        if(current !== null){
             setBicycle(current)
        }
        else
            setBicycle({ 
                id : '',
                name :"",
                email:"",
                phone:"",
                type :"personal"
            })

    }, [bicycleContext, current])

    const onSubmit = e =>{
        e.preventDefault()
        current === null? addBicycle(bicycle): updateBicycle(bicycle)
 
        clearCurrent()
        setBicycle({
            name:'',
            email:'',
            phone:'',
            type:'personal'
        })
    }

    const clearAll = (e) =>{
        // e.preventDefault();
        clearCurrent()
        
    }

    const onChange = e => setBicycle({
        ...bicycle, [e.target.name]:e.target.value
    })

    return (
        <div>             
            <form onSubmit={onSubmit}>
                <h2 className="text-primary">{(!current )? "Add Bicycle" : "Edit Bicycle" }</h2>
                <input type="text" placeholder="Name" name="name" value={name} onChange={onChange}/>
                <input type="email" placeholder="Email" name="email" value={email} onChange={onChange}/>
                <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange}/>
                <h5>Bicycle Type {type}</h5>
                <input type="radio" name="type" value ="personal" onChange={onChange} checked={type==='personal'}/>Personal{' '}
                <input type="radio" name="type" value ="professional" onChange={onChange} checked={type==='professional'}/>Professional{' '}
                <div><input type="submit" value={(!current) ? "Add Bicycle" : "Update Bicycle" }  className="btn btn-primary btn-block"/></div>
                
            </form>
            {(current!==null )&& <div><button className='btn btn-light btn-block' onClick={clearAll}>Clear</button> </div>}
        </div>
    )
}
export default BicycleForm
