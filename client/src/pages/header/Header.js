import React from 'react'
import './index.css'
import {useHistory} from "react-router-dom"
function Header(props) {
    let history=useHistory()
    return (
        <div className='header__container'>
                <ul className="list">
                    <li><a>Login</a></li>
                    <li><a>Chat</a></li>
                    <li><a>Register</a></li>


                </ul>
        </div>
    )
}

export default Header
