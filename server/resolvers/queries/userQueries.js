import User from '../../models/userModel.js'
import {
 ApolloError,
 ValidationError,
 UserInputError,
 AuthenticationError,
} from 'apollo-server-express'
import bcrypt from 'bcryptjs'

export const login = async (_, { input }, ctx) => {
 console.log(ctx)

 const { email, password } = input

 const user = await User.findOne({ email })

 if (!user) {
  return new ApolloError('wrong email... or unknow email')
 }
 const isMatch = await bcrypt.compare(password, user.password)
 console.log(isMatch)

 if (!isMatch) {
  return new ApolloError('wrong password...')
 }
 return {
  ...user.toJSON(),
  token: user.signWithToken(),
  createdAt: user.createdAt.toISOString(),
 }
}

export const users = async (_, {}, ctx) => {
 return User.find({})
  .then((result) => {
   return result.map((user) => {
    return { ...user.toJSON(), createdAt: user.createdAt.toISOString() }
   })
  })
  .catch((err) => new ApolloError(err.err))
}

export const user = async (_, { id }, context) => {
 return User.findById(id)
  .then((user) => {
   return (
    { ...user.toJSON(), createdAt: user.createdAt.toISOString() } ||
    new ValidationError('there is no user with such id')
   )
  })
  .catch((err) => new ApolloError(err.message))
}
