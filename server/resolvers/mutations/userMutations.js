import { ApolloError } from 'apollo-server-express'

export const register = async (_, { input }, { models }) => {
 const { User } = models
 const user = new User(input)
 return user
  .save()
  .then((result) => {
   return { ...result._doc }
  })
  .catch((err) => new ApolloError(err.message))
}
