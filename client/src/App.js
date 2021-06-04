import React from 'react'
import Home from './components/home/Home'
import Footer from "./components/footer/Footer"
import Header from  "./components/header/Header"
import Signup  from "./components/signup/Signup"
import Signin  from "./components/signin/Signin"

import 'bootstrap/dist/css/bootstrap.min.css'

import {Switch,Route} from "react-router-dom"

export default function App() {
  return (
    <div>
      
       <Header/>
       <Switch>
             <Route exact path="/" component={Home}/>
             <Route path="/signin"  component={Signin}/>

       </Switch>


      {/* home component */}
       <Signin/>
      {/* home component */}
    </div>
  )
}
