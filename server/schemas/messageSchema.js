


export const types=`
type Message {
    uuid:String!
    content:String!
    to:String!
    from:String! 
    createdAt:String!
    updatedAt:String!
}
  
input inputMessage{
    to:String!
    content:String

}
`

export const queries=`

  inbox(from:String):[Message]

`
export const mutations=`

  sendMessage(input:inputMessage!):Message
`