import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom"
import { ApolloClient, InMemoryCache} from '@apollo/client';
import {ApolloProvider as Provider} from '@apollo/client/react'

const client = new ApolloClient({
  uri: 'https://localhost:5000',
  cache: new InMemoryCache()
});


ReactDOM.render(
  <Router>
    <Provider client={client}>

    <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
