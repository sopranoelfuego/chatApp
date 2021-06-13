import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { ApolloProvider as Provider } from '@apollo/client/react'
import { AuthProvider } from './components/context/auth.js'

import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
 uri: 'http://localhost:5000/graphql',
})

const authLink = setContext((_, { headers }) => {
 // get the authentication token from local storage if it exists
 const { token } = JSON.parse(localStorage.getItem('user'))
 console.log('user token out here', token)

 // return the headers to the context so httpLink can read them
 return {
  headers: {
   ...headers,
   authorization: token ? `Bearer ${token}` : '',
  },
 }
})
const client = new ApolloClient({
 link: authLink.concat(httpLink),
 cache: new InMemoryCache(),
})

ReactDOM.render(
 <Router>
  <Provider client={client}>
   <AuthProvider>
    <App />
   </AuthProvider>
   ,
  </Provider>
 </Router>,
 document.getElementById('root')
)
