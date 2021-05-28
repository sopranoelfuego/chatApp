export const types = `

  type User{
      _id:ID!
      username: String!
      email:String!
      password:String!
      imageUrl:String
      
  }
  type Response{
    message:String!
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
    login(input:loginUser!):User!
    
    

`
export const mutations = `
   register (input:inputUser!):User!
   loginUser(input:loginUser!):User!
   deleteUser(id:ID):Response!
   deleteUsers:Response!
   
   
   
   
`
