import React from 'react'
import Legend from '../bars/Legend'
import '../bars/Legend.scss'

const ProjectsLegend = ({ labels }) => {
  return (
    <div className="legend-wrapper">
      <React.Fragment>
        <Legend labels={labels.filter((_, i) => i < 2)} />
        <Legend labels={labels.map((label, i) => (i >= 2 && i <= 6 ? label : null))} />
        <Legend labels={labels.map((label, i) => (i > 6 ? label : null))} />
      </React.Fragment>
    </div>
  )
}

export default ProjectsLegend
