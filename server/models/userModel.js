import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema(
 {
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
 },
 { timestamps: true }
)

userSchema.pre('save', async function (next) {
 if (!this.isModified('password')) {
  next()
 }
 const salt = await bcrypt.genSalt()
 this.password = await bcrypt.hash(this.password, salt)
})
userSchema.methods.matchPassword = async function (plainPassword) {
 return await bcrypt.compare(plainPassword, this.password)
}

userSchema.methods.signWithToken = function () {
 return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRE,
 })
}
export default mongoose.model('User', userSchema)
