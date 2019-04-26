import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getDataSelection } from '../../utils'
import { getData } from '../../state/selectors'
import PieChart from './PieChart'
import './PieGrid.scss'

const PieGrid = ({ data, dataSelection, openDialog }) => (
  <div className="pie-grid">
    {data.map(d => (
      <div className="pie-grid-item" key={d.name}>
        <PieChart
          data={d[dataSelection].values.map((value, i) => ({
            label: d[dataSelection].labels[i],
            value,
          }))}
        />
        <div className="title">{d.name}</div>
        <div className="button-container">
          <button className="link" type="button" onClick={openDialog}>
            zoom + context
          </button>
        </div>
      </div>
    ))}
  </div>
)

const PieGridWithDataSelection = ({ location, ...rest }) => (
  <PieGrid dataSelection={getDataSelection(location)} {...rest} />
)

const mapStateToProps = state => ({ data: getData(state) })

export default withRouter(connect(mapStateToProps)(PieGridWithDataSelection))
