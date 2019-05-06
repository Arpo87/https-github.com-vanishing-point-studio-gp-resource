import React from 'react'
import { formatStaff, formatCurrency, formatPercent } from '../../utils'
import PieChart from './PieChart'
import './ProjectPieChart.scss'

const ProjectPieChart = ({ data, title, total, staffUnits }) => (
  <div className="project-pie-chart">
    <div className="pie-container">
      <PieChart data={data} />
    </div>
    <h2>{title}</h2>
    <div className="total">{staffUnits ? formatStaff(total, '-') : formatCurrency(total)}</div>
    <div className="line" />
    <div className="table">
      {data.map(d =>
        !d.exclude ? (
          <div key={d.label} className="legend-item color-scale-item">
            <div className="legend-color color-scale-background" />
            <div className="label">{d.label}</div>
            <div className="value">{staffUnits ? formatStaff(d.value, '-') : formatCurrency(d.value)}</div>
          </div>
        ) : null
      )}
    </div>
  </div>
)

export default ProjectPieChart
