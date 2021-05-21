import { ApolloError } from 'apollo-server-express'

export const register = async (_, { input }, { User }) => {
 const user = new User(input)
 user
  .save()
  .then((result) => 'user created succeffully')
  .catch((err) => new ApolloError(err.message))
}
