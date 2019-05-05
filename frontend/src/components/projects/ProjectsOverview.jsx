import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { sanitize } from '../../utils'
import { getNrosWithProjectData } from '../../state/selectors'
import Breadcrumb from './Breadcrumb'
import './ProjectsOverview.scss'

const ProjectsOverview = ({ nros }) => (
  <div className="projects-overview">
    <Breadcrumb />
    <div className="project-lists">
      <div className="list nro-list">
        <h2>
          <span className="light">By </span>
          <span>NRO</span>
        </h2>
        <React.Fragment>
          {nros.map(nro => (
            <Link key={nro} to={`projects/nros/${sanitize(nro)}`}>
              {nro}
            </Link>
          ))}
        </React.Fragment>
      </div>
      <div className="list priority-list">
        <h2>
          <span className="light">By </span>
          <span>Priority Project</span>
        </h2>
      </div>
    </div>
  </div>
)

const mapStateToProps = state => ({ nros: getNrosWithProjectData(state) })

export default connect(mapStateToProps)(ProjectsOverview)
