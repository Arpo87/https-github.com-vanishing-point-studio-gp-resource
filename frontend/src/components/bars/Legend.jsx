import React from 'react'
import './Legend.scss'

const Legend = ({ labels }) => (
  <div className="legend">
    {labels.map((label, i) =>
      label ? (
        <div key={label} className="legend-item color-scale-item">
          <div className="legend-color color-scale-background" />
          <div className="legend-text">{label}</div>
        </div>
      ) : (
        <div key={'placeholder-' + i} className="legend-placeholder" />
      )
    )}
  </div>
)

export default Legend
