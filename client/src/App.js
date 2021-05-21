import React from 'react'
import Home from './components/home/Home'
import Footer from "./components/footer/Footer"
import Header from  "./components/header/Header"
import Signup  from "./components/signup/Signup"
import Signin  from "./components/signin/Signin"

import {Switch,Route} from "react-router-dom"

export default function App() {
  return (
    <div>
      

       <Switch>
             <Route exact path="/" component={Home}/>
             <Route path="/signin"  component={Signin}/>

       </Switch>


      {/* home component */}
       
      {/* home component */}
    </div>
  )
}
