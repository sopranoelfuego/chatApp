import { ApolloError } from 'apollo-server-express'
import { errorHandler } from '../../utils/error.js'

export const register = async (_, { input }, { models }) => {
 const { User } = models
 const { email, username, password } = input
 const user = new User({ email, username, password })

 return user
  .save()
  .then((result) => {
   return { ...result._doc }
  })
  .catch((err) => {
   console.log(err)
   new ApolloError(err.message)
  })
}

export const deleteUsers = async (_, {}, { models }) => {
 const { User } = models
 await User.deleteMany()

 return { message: 'deleted successfully...' }
}
export const deleteUser = async (_, { id }, { models }) => {
 const { User } = models

 return User.findByIdAndDelete(id, (err, doc) => {
  if (err) return new ApolloError(err.message)
  return { message: 'user deleted..' }
 })
}
