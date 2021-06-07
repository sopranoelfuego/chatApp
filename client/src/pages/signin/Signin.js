import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useQuery,gql, useLazyQuery} from '@apollo/client'



const LOGIN_USER=gql`
   query loginUser($email:String!,$password:String!){
       login(input:{email:$email,password:$password}){
           _id
           username
           email
           token

       }
   }
`
function Signin() {
    
    const [variables, setvariables] = useState({
        email:"",
        password:""
    })
    const [errors, setErrors] = useState({})
  const [registerUser,{loading}]=useLazyQuery(LOGIN_USER,{
      onError:(err)=>setErrors(err.graphQLErrors[0].extensions.errors),
      onCompleted:({login})=>{
          console.log(login)
     localStorage.setItem('user',JSON.stringify(login))
      }
  })

    const handleChange=(e)=>{
        setvariables({...variables,[e.target.name]:e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()

        registerUser({variables})
    }
  
  
    return (
        <div className="row p-5">
            <div className="col-6  bg-secondary">
                ahsjahsjha
            </div>
            <div className="col-6 ">

            <form className="m-5" onSubmit={handleSubmit} >
                 <div className="form-group">
                     <label>email</label>
                    <input className={errors.email ? "form-control is-invalid":"form-control"} type="email" name="email" onChange={handleChange}/>
                    <small className="text-danger">{errors && errors.email}</small>
                 </div>
                 <div className="form-group">
                     <label>password</label>
                    <input className={errors.password ? "form-control is-invalid":"form-control"} type="password" name="password" onChange={handleChange}/>
                    <small className="text-danger">{errors && errors.password}</small>
                 </div>
                 <button type="submit" className="btn btn-primary my-2">sign</button>
                 <div>
                     you are new create a account? <Link to="/register">register now</Link>
                 </div>
             </form>
            </div>
        </div>
    )
}

export default Signin
