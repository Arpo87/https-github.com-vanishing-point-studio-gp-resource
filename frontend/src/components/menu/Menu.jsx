import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { requestLogout } from '../../state/actions'
import { getDataSelection, getDataSelectionOptions } from '../../utils'
import ExitToAppIcon from '../../assets/icons/material/ExitToApp'
import './Menu.scss'

const trimSlash = value => (value.endsWith('/') ? value.slice(0, -1) : value)

const labels = {
  income: 'Income',
  expenses: 'Expenses',
  staff: 'Staff',
  programmeStaff: 'Staff',
  programmeBudget: 'Budget',
  programmeBalance: 'Balance',
}

const LinkWithIcon = withRouter(({ to, text, icon, location, matches, className }) => {
  const toPath = to.split('?')[0]
  const pathname = location.pathname
  const active = trimSlash(pathname) === trimSlash(toPath) || (matches && matches.some(m => m === trimSlash(pathname)))
  return (
    <Link
      to={trimSlash(to)}
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
  const pathname = location.pathname
  const isNroPage = pathname === '/' || pathname === '/breakdowns' || pathname.startsWith('/programme')
  const pageLinkSuffix = pathname.includes('breakdowns') ? '/breakdowns' : '/'
  const viewLinkPrefix = pathname.startsWith('/programme') ? '/programme' : ''
  const selectedIndex = getDataSelectionOptions(location).indexOf(getDataSelection(location))
  return (
    <div id="mainMenu" className="menu">
      <div className="page-selection">
        <LinkWithIcon to={pageLinkSuffix} text="NROs" icon="nro" matches={['/breakdowns']} />
        <LinkWithIcon
          to={'/programme' + pageLinkSuffix}
          text="Programme"
          icon="programme"
          matches={['/programme/breakdowns']}
        />
        <LinkWithIcon to="/projects" text="Projects" icon="project" />
      </div>
      {isNroPage && (
        <React.Fragment>
          <div className="view-selection">
            <div className="title">View</div>
            <div className="view-switch">
              <LinkWithIcon
                to={viewLinkPrefix + '/' + location.search}
                text="Overview"
                icon="map"
                className="overview"
              />
              <LinkWithIcon
                to={viewLinkPrefix + '/breakdowns' + location.search}
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
            <div className={'data-links selected-index-' + selectedIndex}>
              {getDataSelectionOptions(location).map((option, i) => (
                <Link key={option} className="plain" to={location.pathname + (i > 0 ? '?data=' + option : '')} replace>
                  {labels[option]}
                </Link>
              ))}
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
