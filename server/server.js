import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express'
import dotenv from 'dotenv'
import dbConnect from './config/db.js'
import colors from 'colors'
import models from './models/index.js'
import { info } from './utils/log.js'

console.log(models)
import { typeDefs } from './schemas/index.js'
import { resolvers } from './resolvers/index.js'
const app = express()
const NAMESPACE = 'SERVER'
// loading variables
dotenv.config()

dbConnect()
const server = new ApolloServer({ typeDefs, resolvers, context: { models } })

server.applyMiddleware({ app })
const PORT = process.env.PORT || 5001
app.listen(
 PORT,
 info(
  NAMESPACE,
  `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
 )
)
