import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { requestLogout } from '../../state/actions'
import Menu from '../menu/Menu'
import MenuIcon from '../../assets/icons/material/Menu'
import SettingsIcon from '../../assets/icons/material/Settings'
import ExitToAppIcon from '../../assets/icons/material/ExitToApp'
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
    const { admin, logout } = this.props
    return (
      <React.Fragment>
        <div className="title-bar">
          <div className="logo">RI</div>
          <div className="grower" />
          <button id="showMenuButton" className="menu-button plain" type="button" onClick={showMenu}>
            <MenuIcon />
          </button>
          {admin && (
            <div className="anchor">
              <button className="settings-button plain" type="button">
                <SettingsIcon />
              </button>
              <div className="tooltip">Admin Page</div>
            </div>
          )}
          <div className="anchor">
            <button className="logout-button plain" type="button" onClick={logout}>
              <ExitToAppIcon />
            </button>
            <div className="tooltip">Sign out</div>
          </div>
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

const mapStateToProps = state => ({ admin: state.admin })

const mapDispatchToProps = dispatch => ({ logout: () => dispatch(requestLogout()) })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Frame)
