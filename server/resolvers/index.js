import queries from './queries/index.js'
import mutations from './mutations/index.js'
export const resolvers = {
 User: parent => parent.createdAt.toISOString(),
 Message: parent => parent.createdAt.toISOString(),
 Query: {
  ...queries,
 },
 Mutation: {
  ...mutations,
 },
}
