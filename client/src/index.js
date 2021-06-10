import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom"
import { ApolloClient, InMemoryCache,gql} from '@apollo/client';
import {ApolloProvider as Provider} from '@apollo/client/react'
import {AuthProvider} from './components/context/auth.js'
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <Router>
    <Provider client={client}>
       <AuthProvider>
          <App />
       </AuthProvider>,
    </Provider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
