import React,{useState, useEffect,Fragment, useContext} from 'react'

import BicycleContext from '../../context/bicycle/bicycleContext';
import UserContext from '../../context/user/userContext'
import validator from 'validator';

const BicycleForm = () => {
    const bicycleContext= useContext(BicycleContext)
    // const userContext = useContext(UserContext) 
    const [file, setFile] = useState(
        {
            file: null
        });
         const handleOnUploadFile = (e) => {
            setFile({ file: e.target.files[0] });
            
         }

    const {current, addBicycle, showUsers, showUsersList, clearCurrent, updateBicycle} = bicycleContext
    // const {filterUsers, users} = userContext
    const [bicycle, setBicycle] = useState({})
    const [disable, setDisable] = useState(false)

    const{code} = bicycle;
    useEffect(() => {

        if(!showUsers ){
            setDisable(false)
       }

        if(current !== null){
             setBicycle(current)
        }
        else
            setBicycle({ 
                id : '',
                code :"",
            })

    }, [current, showUsers])

    const onChangeOwner =(e)  =>  
    {
        setDisable(true)
        e.preventDefault()
        showUsersList()
    }

    const onSubmit = e =>{
        e.preventDefault()

        var formData= new FormData()
        //  formData.append('avatar', file);
        // formData.append('file',file)
        if(file.file !=null)
        {
            formData.append( 
                "myFile", 
                 file.file, 
                 file.file.name 
              ); 

        }
        
        formData.append('code', bicycle.code);
       
       


        current === null? addBicycle(formData) : updateBicycle(bicycle)
        clearCurrent()
        setBicycle({
            code:''          
        })
        setFile(null)
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
                <div  disabled={disable && showUsers && "disabled"} >

               
                <h2 className="text-primary">{(!current )? "Add Bicycle" : "Edit Bicycle" }</h2>

                <input type="text" placeholder="Code" className="form-control" required minLength="5" name="code" value={code} onChange={onChange}/>
                {(current===null )&&<input type="file" key={file} onChange={handleOnUploadFile} /> 
}
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
                    </div>
            </form>
          </div>

    )
}
export default BicycleForm
