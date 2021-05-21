import queries from './queries/index.js'
import mutations from './mutations/index.js'
export const resolvers = {
 Query: {
  ...queries,
 },
 Mutation: {
  ...mutations,
 },
}
