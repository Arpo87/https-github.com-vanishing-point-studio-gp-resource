import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import './Menu.scss'

const PageLink = withRouter(({ to, text, icon, location }) => {
  const active = location.pathname === to
  return (
    <Link
      to={to}
      className={'plain' + (active ? ' active' : '')}
      onClick={e => {
        if (active) e.preventDefault()
      }}
    >
      <div className="icon-container">
        <i className={icon} />
      </div>
      {text}
    </Link>
  )
})

const Menu = () => (
  <div className="menu">
    <div className="page-selection">
      <PageLink to="/" text="NROs" icon="nro" />
      <PageLink to="/program" text="Program" icon="programme" />
      <PageLink to="/projects" text="Projects" icon="project" />
    </div>
    <div className="view-selection" />
    <div className="data-selection" />
  </div>
)

export default Menu
