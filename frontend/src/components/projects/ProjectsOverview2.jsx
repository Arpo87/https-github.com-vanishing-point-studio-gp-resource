import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProjectGroups } from '../../state/selectors'
import { sanitize } from '../../utils'
import './ProjectsOverview.scss'

const ProjectsOverview = ({ loadingData, projectGroups, nroData }) => (
  <div className="projects-overview">
    <h1>Projects</h1>
    <div className="list-wrap">
      <div className="nros-list">
        <h3>
          By <span>NRO</span>
        </h3>
        <ul>
          {nroData &&
            nroData.map(nro => (
              <li key={nro.name}>
                <Link to={`projects/nros/${sanitize(nro.name)}`}>{nro.name}</Link>
              </li>
            ))}
        </ul>
      </div>
      <div className="projects-list">
        <h3>
          By <span>Projects</span>
        </h3>
        <ul>
          {projectGroups &&
            projectGroups.map((projectGroup, i) => (
              <li key={projectGroup}>
                <Link to={`projects/priorities/${sanitize(projectGroup)}`}>{projectGroup}</Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  </div>
)

const mapStateToProps = state => ({
  projectData: state.projectData,
  nroData: state.nroData,
  projectGroups: getProjectGroups(state),
})

export default connect(mapStateToProps)(ProjectsOverview)
