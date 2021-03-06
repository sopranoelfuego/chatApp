import { gql } from 'apollo-server-express'
import * as user from './userSchema.js'
import * as message from './messageSchema.js'

const types = []
const queries = []
const mutations = []

const schemas = [user,message]

schemas.forEach((single) => {
 types.push(single.types)
 queries.push(single.queries)
 mutations.push(single.mutations)
})

export const typeDefs = gql`
  ${types.join('\n')}
 type Query{
    ${queries.join('\n')}
 }
 type Mutation{
     ${mutations.join('\n')}
 }

`
