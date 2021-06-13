import React, { useContext, createContext, useReducer } from 'react'
import { LOGIN, LOGOUT } from './types.js'
import jwtDecode from 'jwt-decode'
const AuthStateContext = createContext()
const AuthDispatchContext = createContext()

const authReducer = (state, action) => {
 switch (action.type) {
  case LOGIN:
   console.log('this is the object set', action.payload)
   localStorage.setItem('user', JSON.stringify(action.payload))
   return { ...state, user: action.payload }
  case LOGOUT:
   localStorage.removeItem('user')
   return { ...state, user: null }
  default:
   throw new Error()
 }
}

let user = null

let userFromStorage = JSON.parse(localStorage.getItem('user'))
if (userFromStorage) {
 console.log('formated to the json', userFromStorage)
 const token = jwtDecode(userFromStorage.token)
 console.log('this is the token', token)
 // HERE I  JST WANT TO BE SURE IF THE SESSION HASN'T ENDED..
 if (token) {
  const isExpired = new Date(token.exp * 1000)

  if (new Date() > isExpired) {
   localStorage.removeItem('user')
  } else user = userFromStorage
 } else console.log('not token found')
}
export const AuthProvider = ({ children }) => {
 const [state, dispatch] = useReducer(authReducer, { user })

 return (
  <AuthDispatchContext.Provider value={dispatch}>
   <AuthStateContext.Provider value={state}>
    {children}
   </AuthStateContext.Provider>
  </AuthDispatchContext.Provider>
 )
}

export const useAuthState = () => useContext(AuthStateContext)
export const useAuthDispatch = () => useContext(AuthDispatchContext)
