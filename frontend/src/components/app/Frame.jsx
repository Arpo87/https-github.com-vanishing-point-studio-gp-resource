import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Map from '../map/Map'
import Menu from '../menu/Menu'
import './Frame.scss'

const Frame = () => (
  <React.Fragment>
    <div className="left-bar">
      <div className="logo">RI</div>
    </div>
    <Router>
      <Switch>
        <Route path="/" component={Map} />
        <Route path="/breakdowns" render={() => null} />
      </Switch>
    </Router>
    <Menu />
  </React.Fragment>
)

export default Frame
