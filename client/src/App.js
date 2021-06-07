import React from 'react'
import Home from './pages/home/Home'
// import Footer from "./pages/footer/Footer"
import Header from  "./pages/header/Header"
import Signup  from "./pages/signup/Signup"
import Signin  from "./pages/signin/Signin"

import 'bootstrap/dist/css/bootstrap.min.css'

import {Switch,Route} from "react-router-dom"

export default function App() {
  return (
    <div>
      
       <Header/>
       <Switch>
             <Route exact path="/" component={Home}/>
             <Route path="/login"  component={Signin}/>
             <Route path="/register" component={Signup}/>

       </Switch>


      {/* home component */}
       {/* <Signin/> */}
      {/* home component */}
    </div>
  )
}
