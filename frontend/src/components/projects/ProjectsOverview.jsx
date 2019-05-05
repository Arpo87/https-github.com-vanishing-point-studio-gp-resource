import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { sanitize } from '../../utils'
import './ProjectsOverview.scss'

const ProjectsOverview = ({ loadingData, nroData }) => (
  <div className="projects-overview">
    <h1>Projects</h1>
    <div className="project-lists">
      <div className="list nro-list">
        <h2>
          <span className="light">By </span>
          <span>NRO</span>
        </h2>
        <React.Fragment>
          {nroData.map(nro => (
            <Link key={nro.name} to={`projects/nros/${sanitize(nro.name)}`}>
              {nro.name}
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

const mapStateToProps = state => ({ nroData: state.nroData })

export default connect(mapStateToProps)(ProjectsOverview)
