import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Menu from '../menu/Menu'
import MenuIcon from '../../assets/icons/Menu'
import NroPage from '../pages/NroPage'
import NotFound from './NotFound'
import './Frame.scss'

const showMenu = () => document.body.classList.add('menu-open')

const hideMenu = () => document.body.classList.remove('menu-open')

class Frame extends React.Component {
  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick)
  }

  render() {
    return (
      <React.Fragment>
        <div className="title-bar">
          <div className="logo">RI</div>
          <button id="showMenuButton" className="plain" type="button" onClick={showMenu}>
            <MenuIcon />
          </button>
        </div>
        <Switch>
          <Route path="(|/breakdowns)" exact component={NroPage} />
          <Route path="/program" exact render={() => null} />
          <Route path="/projects" exact render={() => null} />
          <Route path="/" component={NotFound} />
        </Switch>
        <div className="frame-grower" />
        <div className="menu-background-overlay" />
        <Menu />
      </React.Fragment>
    )
  }

  handleDocumentClick = e => {
    if (document.body.classList.contains('menu-open')) {
      const clickOnButton = document.getElementById('showMenuButton').contains(e.target)
      const clickOnMenu = document.getElementById('mainMenu').contains(e.target)
      const clickOnMenuLink = Array.from(document.querySelectorAll('#mainMenu a')).some(a => a.contains(e.target))
      if (!clickOnButton && !(clickOnMenu && !clickOnMenuLink)) {
        hideMenu()
      }
    }
  }
}

export default Frame
