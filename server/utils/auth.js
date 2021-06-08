import jwt from 'jsonwebtoken'
import User from "../models/userModel.js"

export const auth = async(context) => {
    let token,decode
    const {req}=context

    if(req.headers.authorization ){
      
       token=req.headers.authorization.split('Bearer ')[1]
    }
    if(!token){
      return
    }
    decode = jwt.verify(token,process.env.JWT_SECRET)
    const user=await  User.findOne({_id:decode.id})
//    console.log("user from auth middlware",user)
   return {user}
  
      
}
