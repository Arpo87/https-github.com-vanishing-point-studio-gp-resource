import React from 'react'
import WebFont from 'webfontloader'
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import BrowserCheck from '../browser/BrowserCheck'
import Frame from '../frame/Frame'
import Login from '../login/Login'
import './App.scss'

WebFont.load({
  google: {
    families: ['Roboto:300,400,500,700,900'],
  },
})

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000' }),
  cache: new InMemoryCache(),
})

const App = () => (
  <BrowserCheck>
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/" component={Frame} />
        </Switch>
      </Router>
    </ApolloProvider>
  </BrowserCheck>
)

export default App
