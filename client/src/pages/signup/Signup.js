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
    const [variables, setvariables] = useState(initialState)

    const REGISTER_USER=gql`
      mutation register($username:String!,$email:String!,$password:String!){
        register(input:{username:$username,email:$email,password:$password}){
              _id
              username
              email
          }
      }
    `
    const [registerUser,{loading}]=useMutation(REGISTER_USER,{
        update(_,res){console.log(res)},
        onError(err){console.log(err)}
    })

    const handleChange=(e)=>setvariables({...variables,[e.target.name]:e.target.value})
    
    
    const handleSubmit=(e)=>{
        
        e.preventDefault()
       registerUser({variables})
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
