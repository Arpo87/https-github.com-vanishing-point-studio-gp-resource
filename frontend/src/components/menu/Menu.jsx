import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getDataSelection } from '../../utils/selectionUtils'
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

const Menu = ({ location }) => {
  const isNroPage = location.pathname === '/' || location.pathname === '/breakdowns'
  const dataSelection = getDataSelection(location)
  return (
    <div className="menu">
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
              <Link className="plain" to={location.pathname}>
                Income
              </Link>
              <Link className="plain" to={location.pathname + '?data=expenses'}>
                Expenses
              </Link>
              <Link className="plain" to={location.pathname + '?data=staff'}>
                Staff
              </Link>
              <span className="selection-indicator" />
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default withRouter(Menu)
