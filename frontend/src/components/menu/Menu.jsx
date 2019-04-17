import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import './Menu.scss'

const LinkWithIcon = withRouter(({ to, text, icon, location, matches, className }) => {
  const active = location.pathname === to || (matches && matches.some(m => m === location.pathname))
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
  const nroPage = location.pathname === '/' || location.pathname === '/breakdowns'
  return (
    <div className="menu">
      <div className="page-selection">
        <LinkWithIcon to="/" text="NROs" icon="nro" matches={['/breakdowns']} />
        <LinkWithIcon to="/program" text="Program" icon="programme" />
        <LinkWithIcon to="/projects" text="Projects" icon="project" />
      </div>
      {nroPage && (
        <React.Fragment>
          <div className="view-selection">
            <div className="title">View</div>
            <div className="view-switch">
              <LinkWithIcon to="/" text="Overview" icon="map" className="overview" />
              <LinkWithIcon
                to="/breakdowns"
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
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default withRouter(Menu)
