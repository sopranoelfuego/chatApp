import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
 username: {
  type: String,
  required: [true, 'username please'],
 },
 firstame: {
  type: String,
  required: [true, 'first name please'],
 },
 lastName: {
  type: String,
  required: [true, 'lastname please'],
 },
 email: {
  type: String,
  required: [true, 'email please'],

  match: [
   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
   'please enter a valid email',
  ],
 },
})

export default mongoose.model('User', userSchema)
