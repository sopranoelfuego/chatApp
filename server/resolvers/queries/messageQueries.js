import User from '../../models/userModel.js'
import Message from '../../models/messageModel.js'
import { ApolloError } from 'apollo-server-errors'



export const inbox=async (_, {from},{user})=>{

     
    if(!user) throw new ApolloError("unauthenticated")
    try {
        const userFrom= await User.findOne({email:from})
        if(!userFrom) throw new ApolloError("user not found")
       const matches=[user.email,from]
       console.log(matches)
       return  Message.find({from:{$in:matches},to:{$in:matches}}).sort({createdAt:'-1'}).then(messages=>{
           return messages.map(sms =>({...sms.toJSON(),createdAt:sms.createdAt.toISOString()}))
       }).catch(err =>new ApolloError(err.message))

    } catch (error) {
        console.log(error)
        throw new ApolloError(error.message)
    }
}