import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Image } from 'react-bootstrap'
import './chat.css'
const GET_USERS = gql`
 query getUser {
  users {
   _id
   username
   email
  }
 }
`
function Chat(user) {
 return (
  <div className="chat">
   <Image src="/images/soso.jpeg" className="profile__image" roundedCircle />
   <div>
    <p>{user.username}</p>
    <p>{user.email}</p>
   </div>
  </div>
 )
}

export default Chat
