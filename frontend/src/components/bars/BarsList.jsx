import React from 'react'
import { formatValue } from '../../utils'
import { groupExists, groupBy } from '../../utils/sort'
import BarStack from './BarStack'
import './BarsList.scss'

const BarRow = ({ nro, dataSelection }) => (
  <div className="bar-row">
    <div className="column">
      <div className="bar-title">
        <div className="name">{nro.name}</div>
        <div className="total">{formatValue(nro[dataSelection].total, dataSelection)}</div>
      </div>
    </div>
    <div className="column">
      <BarStack data={nro[dataSelection]} />
    </div>
  </div>
)

const BarsList = ({ data, dataSelection, sortBy }) => {
  if (groupExists(sortBy.key)) {
    const groups = groupBy(data, sortBy.key)
    return (
      <React.Fragment>
        {groups.map((g, i) => {
          const sortedData = sortBy.comparator ? g.data.sort(sortBy.comparator) : g.data
          return (
            <React.Fragment key={g.label}>
              <div className={'group-label' + (i === 0 ? ' first' : '')}>{g.label}</div>
              {sortedData.map(nro => (
                <BarRow key={nro.name} nro={nro} dataSelection={dataSelection} />
              ))}
            </React.Fragment>
          )
        })}
      </React.Fragment>
    )
  } else {
    const sortedData = sortBy.comparator ? data.sort(sortBy.comparator) : data
    return (
      <React.Fragment>
        {sortedData.map(nro => (
          <BarRow key={nro.name} nro={nro} dataSelection={dataSelection} />
        ))}
      </React.Fragment>
    )
  }
}

export default BarsList
