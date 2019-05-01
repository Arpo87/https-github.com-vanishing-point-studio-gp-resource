import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { requestLogout } from '../../state/actions'
import Menu from '../menu/Menu'
import MenuIcon from '../../assets/icons/material/Menu'
import SettingsIcon from '../../assets/icons/material/Settings'
import ExitToAppIcon from '../../assets/icons/material/ExitToApp'
import DataContainer from './DataContainer'
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
    const { admin, requestLogout } = this.props
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
            <button className="logout-button plain" type="button" onClick={requestLogout}>
              <ExitToAppIcon />
            </button>
            <div className="tooltip">Sign out</div>
          </div>
        </div>
        <Switch>
          <Route path="(|/breakdowns|/programme|/programme/breakdowns)" exact component={DataContainer} />
          <Route path="/projects" exact render={() => <div style={{ flexGrow: 1 }} />} />
          <Route path="/" component={NotFound} />
        </Switch>
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

const mapDispatchToProps = dispatch => ({ requestLogout: () => dispatch(requestLogout()) })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Frame)
