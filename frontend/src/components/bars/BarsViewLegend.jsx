import React from 'react'
import Legend from './Legend'

const BarsViewLegend = ({ data, dataSelection, isProgramme }) => {
  if (!data || data.length === 0 || !data[0][dataSelection]) {
    return null
  }
  const allLabels = data[0][dataSelection].labels
  return (
    <div className="legend-wrapper">
      {!isProgramme ? (
        <Legend labels={allLabels} />
      ) : (
        <React.Fragment>
          <Legend labels={allLabels.filter((_, i) => i < 3)} />
          <Legend labels={allLabels.map((label, i) => (i >= 3 ? label : null))} />
        </React.Fragment>
      )}
    </div>
  )
}

export default BarsViewLegend
