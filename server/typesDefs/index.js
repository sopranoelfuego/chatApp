import { gql } from 'apollo-server-express'
import * as user from './userTypes.js'

const types = []
const queries = []
const mutations = []

const schemas = [user]

schemas.forEach((single) => {
 types.push(single.types)
 queries.push(single.queries)
 mutations.push(single.mutations)
})

export const typesDefs = gql`
  ${types.join('\n')}
 type Query{
    ${queries.join('\n')}
 }
 type mutations{
     ${mutations.join('\n')}
 }

`
