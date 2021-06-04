export const auth = (req) => {
 const authorization = req.headers.authorization || ''
 let token
 if (
  req.headers.authorization &&
  req.headers.authorization.startsWith('Bearer')
 ) {
  token = req.headers.authorization.split('Bearer ')[1]
 }
 const decode = jwt.verify(token, process.env.JWT_SECRET)
 if (decode) {
  console.log(decode)
 }

 console.log(token)
}
