


export const types=`
type Message {
    uuid:String!
    content:String!
    to:String!
    from:String! 
}
  
input inputSendMessage{
    to:String!
    content:String

}
`

export const queries=`

  message:[Message]

`
export const mutations=`

  sendMessage(input:inputSendMessage!):Message
`