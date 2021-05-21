import { ApolloError, ValidationError } from 'apollo-server-express'
/**
 * 
 * register 
loginUser
 * */

export const users = async (_, {}, { User }) => {
 User.find({})
  .then((result) => {
   return result
  })
  .catch((err) => new ApolloError(err.err))
}

export const user = async (_, { id }, { User }) => {
 User.findById(id)
  .then((result) => {
   return result || new ValidationError('there is no user with such id')
  })
  .catch((err) => new ApolloError(err.message))
}
