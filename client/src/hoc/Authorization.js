import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuthState } from '../components/context/auth'

const Authorization = (props) => {
 const { user } = useAuthState()

 if (props.private && !user) {
  return <Redirect to="/login" />
 } else if (props.public && user) {
  return <Redirect to="/" />
 } else {
  return <Route component={props.component} {...props} />
 }
}

export default Authorization
