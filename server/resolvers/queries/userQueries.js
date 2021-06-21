import User from '../../models/userModel.js'
import {
 ApolloError,
 ValidationError,
 UserInputError,
 AuthenticationError,
} from 'apollo-server-express'
import bcrypt from 'bcryptjs'

export const login = async (_, { input }, ctx) => {
 const { email, password } = input
 let errors = {}
 const user = await User.findOne({ email })
 if (email.trim() === '') errors.email = ' email is empty....'

 if (password === '') errors.password = ' password is empty....'

 if (Object.keys(errors).length > 0) {
  throw new UserInputError('input error', { errors })
 }

 if (!user) {
  errors.email = 'wrong email...'
  throw new UserInputError('wrong email... or unknow email', { errors })
 }
 const isMatch = await bcrypt.compare(password, user.password)
 console.log(isMatch)

 if (!isMatch) {
  errors.password = 'wrong password'
  throw new UserInputError('wrong password...', { errors })
 }
 return {
  ...user.toJSON(),
  token: user.signWithToken(),
  createdAt: user.createdAt.toISOString(),
 }
}

export const users = async (_, {}, { user }) => {
 console.log('user logged', user)
 if (!user) {
  errors.authError = 'login first'
  throw new AuthenticationError('unauthenticated')
 }

 return User.find({})
  .then(result => {
   return result.map(user => {
    return {
     ...user.toJSON(),
     createdAt: user.createdAt.toISOString(),
    }
   })
  })
  .catch(err => new ApolloError(err.err))
}

export const getMe = async (_, {}, { user }) => {
 if (!user) {
  throw new AuthenticationError('unauthenticated')
 } else return user
}
export const user = async (_, { id }, context) => {
 return User.findById(id)
  .then(user => {
   return (
    { ...user.toJSON(), createdAt: user.createdAt.toISOString() } ||
    new ValidationError('there is no user with such id')
   )
  })
  .catch(err => new ApolloError(err.message))
}
