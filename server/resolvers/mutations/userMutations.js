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
