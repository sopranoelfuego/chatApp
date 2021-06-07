import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {gql,useMutation} from '@apollo/client'
//   username,
//   email,
//   password,
//   profilePic
function Signup(props) {
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
        // here on "update" we could check for the cache and response from backend mutation success
        update:(_,res)=>{
            console.log(res)
            props.history.push('/signin')
        },
        onError:(err)=>setErrors(err.graphQLErrors[0].extensions.errors)
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
                                <input type="text" name="username" className={errors.username ? "form-control is-invalid":"form-control"} onChange={handleChange}/>
                                <small className="text-danger">{errors && errors.username}</small>
                            </div>
                            <div className="form-group">
                                <label>email</label>
                                <input type="email" className={errors.email?"form-control is-invalid":"form-control"} name="email" onChange={handleChange}/>
                                <small className="text-danger">{errors && errors.email}</small>
                            </div>
                            
                            <div className="form-group">
                                <label>password</label>
                                <input type="password" className={errors.password?"form-control is-invalid":"form-control"} name="password" onChange={handleChange}/>
                                <small className="text-danger">{errors && errors.password}</small>
                            </div>
                                <button className="btn btn-primary" type="submit" disable={loading}>{loading?'sending..':"register"}</button>
                            already have a acount? <Link to="/login"> click here to login..</Link>
                            

                        </form>
                    </div>
             </div>
        </div>
    )
}

export default Signup
