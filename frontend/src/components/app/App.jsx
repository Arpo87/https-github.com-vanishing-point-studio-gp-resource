import React from 'react'
import WebFont from 'webfontloader'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import BrowserCheck from '../browser/BrowserCheck'
import Frame from '../frame/Frame'
import Login from '../login/Login'
import reducer from '../../state/reducer'
import './App.scss'

WebFont.load({
  google: {
    families: ['Roboto:300,400,500,700,900'],
  },
})

const store = createStore(reducer, applyMiddleware(thunk))

const App = () => (
  <BrowserCheck>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/" component={Frame} />
        </Switch>
      </Router>
    </Provider>
  </BrowserCheck>
)

export default App
