import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useQuery,gql} from '@apollo/client'



const LOGIN_USER=gql`
   query loginUser($email:String!,$password:String!){
       login(input:{email:$email}){
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
    let errors
//    const [loginUser,{loading}]=useQuery(LOGIN_USER,{
//        update:(_,res)=>console.log(res),
//        onError:(err)=>console.log(err.graphQLErrors[0].extensions.errors)
//    })
    const handleChange=(e)=>{
        setvariables({...variables,[e.target.name]:e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(variables)
        // loginUser({variables})
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
                    <input className="form-control" type="email" name="email" onChange={handleChange}/>
                    
                 </div>
                 <div className="form-group">
                     <label>password</label>
                    <input className="form-control"type="password" name="password" onChange={handleChange}/>
                    
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
