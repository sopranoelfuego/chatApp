import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'
function Header(props) {
 return (
  <div className="header__container">
   <ul className="list">
    <li>
     <Link to="/login">
      <h4>Login</h4>
     </Link>
    </li>
    <li>
     <Link to="/">
      <h4>Chat</h4>
     </Link>
    </li>
    <li onClick={() => localStorage.removeItem('user')}>
     <Link to="/login">
      <h4>logout</h4>
     </Link>
    </li>
   </ul>
  </div>
 )
}

export default Header
