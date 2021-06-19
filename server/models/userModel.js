import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema(
 {
  username: {
   type: String,
   required: [true, 'username please'],
  },
  //   username,
  //   email,
  //   password,
  //   profilePic
  email: {
   type: String,
   unique: true,
   required: [true, 'email please'],
   match: [
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    'please enter a valid email',
   ],
  },
  profilePic: {
   type: String,
   default:
    'https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.toiimg.com%2Fthumb%2Fresizemode-4%2Cmsid-76729750%2Cimgsize-249247%2Cwidth-720%2F76729750.jpg&imgrefurl=https%3A%2F%2Fwww.gadgetsnow.com%2Fhow-to%2Fhow-to-create-your-own-facebook-avatars-and-share-it-with-friends%2Farticleshow%2F76729536.cms&tbnid=D3-OAZu4VtdNEM&vet=12ahUKEwiX44LP1p3xAhUS-BoKHT3zD5wQMygEegUIARCvAQ..i&docid=agDrkAJLkdATCM&w=720&h=540&q=avatar%20pic&ved=2ahUKEwiX44LP1p3xAhUS-BoKHT3zD5wQMygEegUIARCvAQ',
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
