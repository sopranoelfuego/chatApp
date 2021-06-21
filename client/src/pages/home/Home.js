import React from 'react'
import { gql, useQuery } from '@apollo/client'
import './index.css'
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
 const { data, loading, error } = useQuery(GET_USERS)
 let displayUsers
 if (error) console.log(error)
 if (loading) {
  displayUsers = <h4>loading....</h4>
 }
 if (data) {
  console.log(data)
  displayUsers = data.users.map(user => (
   <div key={user._id} className="chat">
    <p>{user.username}</p>
   </div>
  ))
 }
 return (
  <div className="home_container">
   <div className="left_container">{displayUsers}</div>
   <div className="right_container">message out here</div>
  </div>
 )
}

export default Home
