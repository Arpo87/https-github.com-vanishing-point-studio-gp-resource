import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { sanitize } from '../../utils'
import { getNrosWithProjectData, getProjectGroups } from '../../state/selectors'
import Breadcrumb from './Breadcrumb'
import './ProjectsOverview.scss'

const ProjectsOverview = ({ nros, projectGroups }) => (
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
          <span>Project Group</span>
        </h2>
        <React.Fragment>
          {projectGroups.map(projectGroup => (
            <Link key={projectGroup} to={`projects/groups/${sanitize(projectGroup)}`}>
              {projectGroup}
            </Link>
          ))}
        </React.Fragment>
      </div>
    </div>
  </div>
)

const mapStateToProps = state => ({ nros: getNrosWithProjectData(state), projectGroups: getProjectGroups(state) })

export default connect(mapStateToProps)(ProjectsOverview)
