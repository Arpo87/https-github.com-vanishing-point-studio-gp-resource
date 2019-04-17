import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Map from '../map/Map'
import Menu from '../menu/Menu'
import './Frame.scss'

const Frame = () => (
  <Router>
    <div className="title-bar">
      <div className="logo">RI</div>
    </div>
    <Switch>
      <Route path="/" exact component={Map} />
      <Route path="/breakdowns" render={() => null} />
    </Switch>
    <div className="frame-grower" />
    <Menu />
  </Router>
)

export default Frame
