import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Menu from '../menu/Menu'
import NroPage from '../pages/NroPage'
import './Frame.scss'

const Frame = () => (
  <Router>
    <div className="title-bar">
      <div className="logo">RI</div>
    </div>
    <Switch>
      <Route path="(|/breakdowns)" exact component={NroPage} />
    </Switch>
    <div className="frame-grower" />
    <Menu />
  </Router>
)

export default Frame
