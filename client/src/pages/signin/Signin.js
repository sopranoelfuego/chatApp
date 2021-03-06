import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { gql, useLazyQuery } from '@apollo/client'
import { useAuthDispatch } from '../../components/context/auth.js'
import { LOGIN } from '../../components/context/types.js'

const LOGIN_USER = gql`
 query loginUser($email: String!, $password: String!) {
  login(input: { email: $email, password: $password }) {
   _id
   username
   email
   token
  }
 }
`
function Signin() {
 const [variables, setvariables] = useState({
  email: '',
  password: '',
 })
 const history = useHistory()
 const dispatch = useAuthDispatch()
 const [errors, setErrors] = useState({})
 const [registerUser, { loading }] = useLazyQuery(LOGIN_USER, {
  onError: err => {
   err.graphQLErrors[0] !== null
    ? setErrors(err.graphQLErrors[0].extensions.errors)
    : setErrors({ connexion: 'connection error..' })
   setTimeout(() => {
    setErrors(null)
   }, 2000)
  },
  onCompleted: ({ login }) => {
   dispatch({ type: LOGIN, payload: login })
   history.push('/')
  },
 })

 const handleChange = e => {
  setvariables({ ...variables, [e.target.name]: e.target.value })
 }
 const handleSubmit = e => {
  e.preventDefault()

  registerUser({ variables })
 }
 errors?.connexion && <p>check your connexion</p>

 return (
  <div className="row p-5">
   <div className="col-6  bg-secondary">ahsjahsjha</div>
   <div className="col-6 ">
    <form className="m-5" onSubmit={handleSubmit}>
     <div className="form-group">
      <label>email</label>
      <input
       className={
        errors && errors.email ? 'form-control is-invalid' : 'form-control'
       }
       type="email"
       name="email"
       onChange={handleChange}
      />
      <small className="text-danger">{errors && errors.email}</small>
     </div>
     <div className="form-group">
      <label>password</label>
      <input
       className={
        errors && errors.password ? 'form-control is-invalid' : 'form-control'
       }
       type="password"
       name="password"
       onChange={handleChange}
      />
      <small className="text-danger">{errors && errors.password}</small>
     </div>
     <button type="submit" className="btn btn-primary my-2" disabled={loading}>
      sign
     </button>
     <div>
      you are new create a account? <Link to="/register">register now</Link>
     </div>
    </form>
   </div>
  </div>
 )
}

export default Signin
