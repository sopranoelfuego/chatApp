import { ApolloError, ValidationError } from 'apollo-server-express'
/**
 * 
 * register 
loginUser
 * */

export const login = async(_, { input }, { models }){
  const {User}= models
  const{email, password}= input
  const user=await User.find({where:{email}})
  if(!user){
    return new ApolloError("user doesn't exist...")
  }
  const rightPassword=await user.passwordVerification(password)
  if(!rightPassword){
    return new ApolloError("wrong password...")
  }
  
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
