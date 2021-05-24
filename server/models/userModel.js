import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
 username: {
  type: String,
  required: [true, 'username please'],
 },
 email: {
  type: String,
  unique: true,
  required: [true, 'email please'],
  match: [
   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
   'please enter a valid email',
  ],
 },
 password: {
  type: String,
  required: [true, 'password please'],
 },
})

userSchema.pre('save', async function (next) {
 if (!this.isModified('password')) {
  next()
 }
 const salt = await bcrypt.genSalt()
 this.password = await bcrypt.hash(this.password, salt)
})
userSchema.methods.passwordVerification = async function (plainPassword) {
 return bcrypt.compare(plainPassword, this.password)
}
export default mongoose.model('User', userSchema)
