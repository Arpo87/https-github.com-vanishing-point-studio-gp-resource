import React from 'react'
import { connect } from 'react-redux'
import { formatValue } from '../../utils'
import Breadcrumb from './Breadcrumb'
import BarStack from '../bars/BarStack'
import ProjectsLegend from './ProjectsLegend'
import { getProjectGroupData } from '../../state/selectors'
import './ProjectGroupDetails.scss'

const relativeWidths = false

const ProjectGroupDetails = ({ projects }) => {
  const max = Math.max(...projects.map(p => p.totalBudget))
  return (
    <div className="project-group-details">
      <Breadcrumb name={projects[0].projectGroup} />
      <div className="legend-row">
        <div className="column" />
        <div className="column">
          <div className="title">Legend</div>
          <ProjectsLegend labels={projects[0].labels} />
        </div>
      </div>
      {projects.map(project => {
        const width = relativeWidths ? (project.totalBudget / max) * 100 + '%' : '100%'
        return (
          <div className="bar-row" key={project.nro}>
            <div className="column">
              <div className="bar-title">
                <div className="name">{project.nro}</div>
                <div className="total">{formatValue(project.totalBudget, 'euro')}</div>
              </div>
            </div>
            <div className="column">
              <div className="bar-stack-container" style={{ width }}>
                <BarStack data={project} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  projects: getProjectGroupData(state, ownProps.match.params.project),
})

export default connect(mapStateToProps)(ProjectGroupDetails)
