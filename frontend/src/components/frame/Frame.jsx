import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Map from '../map/Map'
import Menu from '../menu/Menu'
import './Frame.scss'

const NroView = ({ location }) => {
  const dataSelection = new URLSearchParams(location.search).get('data') || 'income'
  const dataSelectionCapitalized = dataSelection.charAt(0).toUpperCase() + dataSelection.slice(1)
  const breakdowns = location.pathname === '/breakdowns'
  return (
    <div className="nro-view">
      <h1>
        <span className="light">Showing </span>
        <span>{dataSelectionCapitalized + ' per NRO'}</span>
        <span className="light">{breakdowns ? ' with ' : ' at a '}</span>
        <span>{breakdowns ? 'breakdowns' : 'relative scale'}</span>
      </h1>
      {breakdowns ? null : <Map />}
    </div>
  )
}

const Frame = () => (
  <Router>
    <div className="title-bar">
      <div className="logo">RI</div>
    </div>
    <Switch>
      <Route path={/(^\/$|^\/breakdowns$)/} exact component={NroView} />
    </Switch>
    <div className="frame-grower" />
    <Menu />
  </Router>
)

export default Frame
