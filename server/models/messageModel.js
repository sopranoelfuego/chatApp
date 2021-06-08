import mongoose from 'mongoose'


const messageSchema=new mongoose.Schema({
    content:{
        type:String,
        required:[true, 'content please']
    },
    uuid:String,
    from:String,
    to:String,
},{timestamps:true})

export default mongoose.model('Message',messageSchema)
