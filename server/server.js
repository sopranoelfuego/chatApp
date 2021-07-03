import {
 ApolloServer,
 gql,
 AuthenticationError,
 ApolloError,
} from 'apollo-server-express'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import dbConnect from './config/db.js'
import colors from 'colors'
import User from './models/userModel.js'
import { info } from './utils/log.js'
import {auth} from './utils/auth.js'
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
 context: auth

})
app.use(cors())

server.applyMiddleware({ app })
const PORT = process.env.PORT || 5001
app.listen(
 PORT,
 info(
  NAMESPACE,
  `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
 )
)
