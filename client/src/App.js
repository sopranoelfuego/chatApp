import React from 'react'
import Home from './pages/home/Home'
// import Footer from "./pages/footer/Footer"
import Header from './pages/header/Header'
import Signup from './pages/signup/Signup'
import Signin from './pages/signin/Signin'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Switch, Route } from 'react-router-dom'
import Authorization from './hoc/Authorization'
import { gql, useQuery } from '@apollo/client'

export default function App() {
 return (
  <div>
   <Header />
   <Switch>
    <Authorization exact path="/" component={Home} private />
    <Authorization path="/login" component={Signin} public />
    <Authorization path="/register" component={Signup} public />
   </Switch>

   {/* home component */}
   {/* <Signin/> */}
   {/* home component */}
  </div>
 )
}
