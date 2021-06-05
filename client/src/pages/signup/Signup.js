import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {gql,useMutation} from '@apollo/client'
//   username,
//   email,
//   password,
//   profilePic
function Signup() {
    const initialState={
        username:"",
        email:"",
        password:"",
        
    }
    const [formData, setformData] = useState(initialState)

    const REGISTER_USER=gql`
      mutation registerUser($username:String!,$email:String!,$password:String!){
          registerUser(username:$username,email:$email,password:$password){
              _id
              username
              email
          }
      }
    `
    const [registerUser,{loading}]=useMutation(REGISTER_USER)

    const handleChange=(e)=>setformData({...formData,[e.target.name]:e.target.value})
    
    
    const handleSubmit=(e)=>{
        
        e.preventDefault()
        console.log(formData)
    }
    return (
        <div className="container">
             <div className="row">
                    <div className="col-sm-8 col-md-6 col-lg-4">

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>username</label>
                                <input type="text" name="username" className="form-control" onChange={handleChange}/>
                            </div>
                            <div className="form-group">
                                <label>email</label>
                                <input type="email" className="form-control" name="email" onChange={handleChange}/>
                            </div>
                            
                            <div className="form-group">
                                <label>password</label>
                                <input type="password" className="form-control" name="password" onChange={handleChange}/>
                            </div>
                                <button className="btn btn-primary" type="submit">register</button>
                            already have a acount? <Link to="/signin"> click here to login..</Link>
                            

                        </form>
                    </div>
             </div>
        </div>
    )
}

export default Signup
