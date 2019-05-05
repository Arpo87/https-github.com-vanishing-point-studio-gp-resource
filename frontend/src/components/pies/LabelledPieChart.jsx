import React from 'react'
import { formatValue, formatPercent } from '../../utils'
import PieChart from './PieChart'
import './LabelledPieChart.scss'

const LabelledPieChart = ({ data, title, total, staffUnits }) => (
  <div className="labelled-pie-chart">
    <div className="pie-container">
      <PieChart data={data} />
    </div>
    <h2>{title}</h2>
    <div className="total">{formatValue(total, staffUnits && 'staff')}</div>
    <div className="line" />
    <div className="table">
      {data.map(d =>
        !d.exclude ? (
          <div key={d.label} className="legend-item color-scale-item">
            <div className="legend-color color-scale-background" />
            <div className="label">{d.label}</div>
            <div className="value">{formatPercent(d.value, total)}</div>
          </div>
        ) : null
      )}
    </div>
  </div>
)

export default LabelledPieChart
