import { ApolloError, AuthenticationError, UserInputError } from 'apollo-server-errors'
import User from '../../models/userModel.js'
import Message from '../../models/messageModel.js'
import { v4 as uuidv4 } from 'uuid';



export const sendMessage=async (_, {input},{user})=>{
    if(!user)throw new AuthenticationError('unauthenticated')
    const {to,content}=input
   
    if( user.email==to){
        return new ApolloError('error u cannot send sms to yourself...')
     }

    try { 

        if(content.trim() ==='')throw new UserInputError('content is empty..')
        if(to.trim() ==='')throw new UserInputError('recipient field  is empty..')
        const recip=await User.findOne({email :to})
        if(!recip) throw new UserInputError('user not found')
       const message=new Message({...Message,to,content})
        message.from=user.email
        message.uuid=uuidv4()
       return message.save().then(message =>{
            // console.log(message)
                return {...message.toJSON(),createdAt:message.createdAt.toISOString()}
        }).catch(err => { 
            console.log(err.message)
            throw new ApolloError(err.message)
        })
    } catch (error) {
        console.log(error)
        throw new ApolloError(error.message)
    }
}