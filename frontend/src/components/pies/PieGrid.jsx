import React from 'react'
import { withRouter } from 'react-router-dom'
import PieChart from './PieChart'
import { data, labels } from '../../utils/fakeData'
import { getDataSelection } from '../../utils'
import './PieGrid.scss'

const PieGrid = ({ data, labels, dataSelection }) => (
  <div className="pie-grid">
    {data.map(d => (
      <div className="pie-grid-item" key={d.location}>
        <PieChart
          data={d[dataSelection].map((d, i) => ({
            label: labels[dataSelection][i],
            value: d,
          }))}
        />
        <div className="title">{d.location}</div>
      </div>
    ))}
  </div>
)

const PieGridWithFakeData = ({ location }) => (
  <PieGrid data={data} labels={labels} dataSelection={getDataSelection(location)} />
)

export default withRouter(PieGridWithFakeData)
