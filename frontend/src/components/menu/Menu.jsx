import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { requestLogout } from '../../state/actions'
import { getDataSelection } from '../../utils'
import ExitToAppIcon from '../../assets/icons/material/ExitToApp'
import './Menu.scss'

const LinkWithIcon = withRouter(({ to, text, icon, location, matches, className }) => {
  const toPath = to.split('?')[0]
  const active = location.pathname === toPath || (matches && matches.some(m => m === location.pathname))
  return (
    <Link
      to={to}
      className={'plain' + (active ? ' active' : '') + (className ? ' ' + className : '')}
      onClick={e => {
        if (active) e.preventDefault()
      }}
    >
      <div className="icon-container">{typeof icon === 'string' ? <i className={icon} /> : icon}</div>
      <span>{text}</span>
    </Link>
  )
})

const Menu = ({ location, requestLogout }) => {
  const isNroPage = location.pathname === '/' || location.pathname === '/breakdowns'
  const dataSelection = getDataSelection(location)
  return (
    <div id="mainMenu" className="menu">
      <div className="page-selection">
        <LinkWithIcon to="/" text="NROs" icon="nro" matches={['/breakdowns']} />
        <LinkWithIcon to="/program" text="Program" icon="programme" />
        <LinkWithIcon to="/projects" text="Projects" icon="project" />
      </div>
      {isNroPage && (
        <React.Fragment>
          <div className="view-selection">
            <div className="title">View</div>
            <div className="view-switch">
              <LinkWithIcon to={'/' + location.search} text="Overview" icon="map" className="overview" />
              <LinkWithIcon
                to={'/breakdowns' + location.search}
                text="Breakdowns"
                icon={
                  <div>
                    <span />
                    <span />
                    <span />
                  </div>
                }
                className="breakdowns"
              />
            </div>
          </div>
          <div className="data-selection">
            <div className="title">Data to show</div>
            <div className={'data-links ' + dataSelection}>
              <Link className="plain" to={location.pathname} replace>
                Income
              </Link>
              <Link className="plain" to={location.pathname + '?data=expenses'} replace>
                Expenses
              </Link>
              <Link className="plain" to={location.pathname + '?data=staff'} replace>
                Staff
              </Link>
              <span className="selection-indicator" />
            </div>
          </div>
          <div className="grower" />
          <button className="logout-button plain" onClick={requestLogout}>
            <span>Sign out</span>
            <ExitToAppIcon />
          </button>
        </React.Fragment>
      )}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  requestLogout: () => {
    document.body.classList.remove('menu-open') // Regular listener will not fire because frame unmounts.
    dispatch(requestLogout())
  },
})

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Menu)
)
