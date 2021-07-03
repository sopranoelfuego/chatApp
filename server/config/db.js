import mongoose from 'mongoose'
import { error, info } from '../utils/log.js'
const NAMESPACE = 'SERVER'
const dbConnect = async () =>
 mongoose
  .connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
  })
  .then((conn) =>
   info(
    NAMESPACE,
    `database connect ${conn.connection.host}://${conn.connection.name}:${conn.connection.port}`
   )
  )
  .catch((err) => error(NAMESPACE, `DATABASE-ERROR ${err.message} `))

export default dbConnect
