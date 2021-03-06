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
  expenses: 'Expenditure',
  staff: 'Staff',
  programmeStaff: 'Staff',
  programmeBudget: 'Budget',
  programmeBalance: 'Costs Ratio',
}

const LinkWithIcon = withRouter(({ to, text, icon, location, matches, className, exact = true }) => {
  const toPath = to.split('?')[0]
  const pathname = location.pathname
  const active = trimSlash(pathname) === trimSlash(toPath) || (matches && matches.some(m => m === trimSlash(pathname)))
  const includes = trimSlash(pathname).includes(trimSlash(toPath))
  return (
    <Link
      to={trimSlash(to)}
      className={'plain' + (active || (!exact && includes) ? ' active' : '') + (className ? ' ' + className : '')}
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
  const currentSelection = getDataSelection(location)
  const selectedIndex = getDataSelectionOptions(location).indexOf(currentSelection)
  return (
    <div id="mainMenu" className="menu">
      <div className="menu-content">
        <div className="page-selection">
          <LinkWithIcon to={pageLinkSuffix} text="NROs" icon="nro" matches={['/breakdowns']} />
          <LinkWithIcon
            to={'/programme' + pageLinkSuffix}
            text="Programme"
            icon="programme"
            matches={['/programme/breakdowns']}
          />
          <LinkWithIcon to="/projects" text="Projects" icon="project" exact={false} />
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
                  <Link
                    key={option}
                    className={'plain' + (option === currentSelection ? ' selected' : '')}
                    to={location.pathname + (i > 0 ? '?data=' + option : '')}
                    replace
                  >
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
