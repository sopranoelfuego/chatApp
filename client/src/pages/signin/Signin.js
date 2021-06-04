import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Signin() {
    
    const [formData, setformData] = useState({
        email:"",
        password:""
    })
    const handleChange=(e)=>{
        setformData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(formData)
    }
    return (
        <div className="row p-5">
            <div className="col-8 bg-secondary">
                ahsjahsjha
            </div>
            <div className="col-4">

            <form className="m-5" onSubmit={handleSubmit} >
                 <div className="form-group">
                     <label>email</label>
                    <input className="form-control"type="email" name="email" onChange={handleChange}/>
                    
                 </div>
                 <div className="form-group">
                     <label>password</label>
                    <input className="form-control"type="password" name="password" onChange={handleChange}/>
                    
                 </div>
                 <button type="submit" className="btn btn-primary my-2">sign</button>
                 <div>
                     you are new create a account? <Link to="/Signup">register now</Link>
                 </div>
             </form>
            </div>
        </div>
    )
}

export default Signin
