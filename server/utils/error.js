import { ApolloError } from 'apollo-server-express'

export const errorHandler = (error) => {
 let errorMessage = ''
 if (error.code === 11000) {
  errorMessage = `${error.keyValue} is already taken...`
 }

 return new ApolloError(errorMessage || 'error acure')
}
