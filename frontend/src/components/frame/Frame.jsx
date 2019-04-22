import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Menu from '../menu/Menu'
import MenuIcon from '../../assets/icons/Menu'
import NroPage from '../pages/NroPage'
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
      <Router>
        <div className="title-bar">
          <div className="logo">RI</div>
          <button id="showMenuButton" className="plain" type="button" onClick={showMenu}>
            <MenuIcon />
          </button>
        </div>
        <Switch>
          <Route path="(|/breakdowns)" exact component={NroPage} />
        </Switch>
        <div className="frame-grower" />
        <div className="menu-background-overlay" />
        <Menu />
      </Router>
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
