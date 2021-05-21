export const types = `

  type User{
      id:ID!
      username: String!
      email:String!
      password:String!
      
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
   register (input:inputUser!):String!
   loginUser(input:loginUser!):String!
   
`
