import React from 'react'
import WebFont from 'webfontloader'
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

const App = () => (
  <BrowserCheck>
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/" component={Frame} />
      </Switch>
    </Router>
  </BrowserCheck>
)

export default App
