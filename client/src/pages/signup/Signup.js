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
    const [errors, setErrors] = useState({})
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
        onError(err){
            console.log(err.graphQLErrors[0].extensions.errors)
            setErrors(err.graphQLErrors[0].extensions.errors)}
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
                                <small className="text-danger">{errors && errors.username}</small>
                            </div>
                            <div className="form-group">
                                <label>email</label>
                                <input type="email" className="form-control" name="email" onChange={handleChange}/>
                                <small className="text-danger">{errors && errors.email}</small>
                            </div>
                            
                            <div className="form-group">
                                <label>password</label>
                                <input type="password" className="form-control" name="password" onChange={handleChange}/>
                                <small className="text-danger">{errors && errors.password}</small>
                            </div>
                                <button className="btn btn-primary" type="submit" disable={loading ?'true':'false'}>{loading?'sending..':"register"}</button>
                            already have a acount? <Link to="/signin"> click here to login..</Link>
                            

                        </form>
                    </div>
             </div>
        </div>
    )
}

export default Signup
