import bcrypt from 'bcrypt'
import {
 ApolloError,
 ValidationError,
 UserInputError,
 AuthenticationError,
} from 'apollo-server-express'

export const login = async (_, { input }, { models }) => {
 const { User } = models
 const { email, password } = input

 return User.find({ email })
  .then((user) => {
   const match = user.matchPassword(password)
   if (!match) {
    return new AuthenticationError('wrong password')
   }
   return user
  })
  .catch((err) => {
   return new ApolloError('wrong email..')
  })
}

export const users = async (_, {}, { models }) => {
 const { User } = models
 return User.find()
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
