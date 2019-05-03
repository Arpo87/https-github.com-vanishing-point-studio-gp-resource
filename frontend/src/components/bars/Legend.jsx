import React from 'react'
import './Legend.scss'

const Legend = ({ labels, isProgramme }) => (
  <div className={'legend' + (isProgramme ? ' programme' : '')}>
    {labels.map(label => (
      <div className="legend-item" key={label}>
        <div className="legend-color" />
        <div className="legend-text">{label}</div>
      </div>
    ))}
  </div>
)

export default Legend
