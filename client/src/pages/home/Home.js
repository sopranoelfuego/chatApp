import React from 'react'

import { gql, useQuery } from '@apollo/client'
import { Image } from 'react-bootstrap'
import Chat from '../../components/chat/Chat'
import './home.css'
const GET_USERS = gql`
 query getUser {
  users {
   _id
   username
   email
  }
 }
`
function Home() {
 return (
  <div className="container">
   <div className="chat__container">
    {/* <Chat /> */}
    <div className="chat__wrapper">chat</div>
   </div>
   <div className="inbox__container">
    <div className="inbox__wrapper">inbox</div>
   </div>
   <div className="online__container">
    <div className="online__wrapper">online</div>
   </div>
  </div>
 )
}

export default Home
