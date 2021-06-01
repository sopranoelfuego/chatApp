import {
 ApolloServer,
 gql,
 AuthenticationError,
 ApolloError,
} from 'apollo-server-express'
import express from 'express'
import dotenv from 'dotenv'
import dbConnect from './config/db.js'
import colors from 'colors'
import jwt from 'jsonwebtoken'
import User from './models/userModel.js'
import { info } from './utils/log.js'

import { typeDefs } from './schemas/index.js'
import { resolvers } from './resolvers/index.js'
const app = express()
const NAMESPACE = 'SERVER'
// loading variables
dotenv.config()

dbConnect()
const server = new ApolloServer({
 typeDefs,
 resolvers,
 context: ({ req }) => {
  console.log(req)
  let token
  if (
   req.headers.authorization &&
   req.headers.authorization.startsWith('Bearer')
  ) {
   token = req.headers.authorization.split('Bearer ')[1]
  }
  if (!token) {
   return new ApolloError('loggin first')
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET)
  console.log(decode)
  return User.find(decode.id)
   .then((result) => {
    return result
   })
   .catch((err) => new ApolloError(err.message))
  token && console.log(token)
 },
})

server.applyMiddleware({ app })
const PORT = process.env.PORT || 5001
app.listen(
 PORT,
 info(
  NAMESPACE,
  `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
 )
)
