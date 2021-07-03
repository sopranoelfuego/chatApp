import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Image } from 'react-bootstrap'
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
  return <h4>loading....</h4>
 }
 if (data) {
  console.log(data)
  return (
   data &&
   data.users.map(user => {
    return (
     <div>
      <img src="/images/soso.jpeg" className="profile__image" />
     </div>
    )
   })
  )
 }
 return displayUsers
}

export default Home
