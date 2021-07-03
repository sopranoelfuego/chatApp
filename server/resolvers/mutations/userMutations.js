import { ApolloError, UserInputError } from 'apollo-server-express'
import User from '../../models/userModel.js'
export const register = async (_, { input }) => {
 const { email, username, password } = input
 let errors={}


 if(email.trim()=== '') errors.email=" email must not be empty..."
 if(username.trim()=== '') errors.username=" username must not be empty..."
 if(password==='') errors.password=" password must not be empty..."

 if(Object.keys.length>0) throw new UserInputError('bad input',{errors})
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

export const deleteUsers = async (_, {}, { user }) => {
 
 await User.remove({})
}
export const deleteUser = async (_, { id }, { models }) => {
 const { User } = models
 return User.findByIdAndDelete(id)
  .then((result) => {
   return result
  })
  .catch((err) => new ApolloError(err.message))
}
