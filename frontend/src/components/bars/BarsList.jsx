import React from 'react'
import { formatValue } from '../../utils'
import { groupings } from '../../utils/groupings'
import BarStack from './BarStack'
import './BarsList.scss'

const BarRow = ({ rowData, dataSelection }) => (
  <div className="bar-row">
    <div className="column">
      <div className="bar-title">
        <div className="name">{rowData.name}</div>
        <div className="total">{formatValue(rowData[dataSelection].total, dataSelection)}</div>
      </div>
    </div>
    <div className="column">
      <BarStack data={rowData[dataSelection]} />
    </div>
  </div>
)

const BarsList = ({ data, dataSelection, sortBy }) => {
  const grouping = groupings[sortBy.key]
  if (grouping) {
    return null
  } else {
    const sortedData = sortBy.comparator ? data.sort(sortBy.comparator) : data
    return (
      <React.Fragment>
        {sortedData.map(d => (
          <BarRow key={d.name} rowData={d} dataSelection={dataSelection} />
        ))}
      </React.Fragment>
    )
  }
}

export default BarsList
