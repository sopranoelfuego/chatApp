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
import cors from 'cors'
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
 context: async({req})=>{
   let token,decode

  if(req.headers.authorization ){
    
     token=req.headers.authorization.split('Bearer ')[1]
  }
  if(!token){
    return
  }
  decode = jwt.verify(token,process.env.JWT_SECRET)
  const user=await  User.findOne({_id:decode.id})
 
 return {user}

     
 }

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
