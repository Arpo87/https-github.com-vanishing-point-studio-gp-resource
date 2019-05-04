import React from 'react'
import './Legend.scss'

const Legend = ({ labels }) => (
  <div className="legend">
    {labels.map(label =>
      label ? (
        <div className="legend-item color-scale-item" key={label}>
          <div className="legend-color color-scale-background" />
          <div className="legend-text">{label}</div>
        </div>
      ) : (
        <div className="legend-placeholder" />
      )
    )}
  </div>
)

export default Legend
