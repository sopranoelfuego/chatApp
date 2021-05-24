import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const userSchema = new mongoose.Schema({
 username: {
  type: String,
  required: [true, 'username please'],
 },
 email: {
  type: String,
  required: [true, 'email please'],
  password: {
   type: String,
   min: 6,
   required: [true, 'password please'],
  },
  match: [
   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
   'please enter a valid email',
  ],
 },
})

userSchema.pre('save', async function (next) {
 if (!this.isModified('password')) {
  next()
 }
 const salt = await bcrypt.genSalt(process.env.SALT_ROUND)
 this.password = bcrypt.hash(this.password, salt)
})
export default mongoose.model('User', userSchema)
