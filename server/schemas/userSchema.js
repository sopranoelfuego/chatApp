export const types = `

  type User{
      _id:ID!
      username: String!
      email:String!
      password:String
      imageUrl:String
      
  }
  input inputUser{
    username: String!
    email:String!
    password:String!

  }
  input loginUser{
      email:String!
      password:String!
  }

`
export const queries = `
    user(id:ID):User!
    users:[User]!
    

`
export const mutations = `
   register (input:inputUser!):User!
   loginUser(input:loginUser!):User!
   
   
   
`
