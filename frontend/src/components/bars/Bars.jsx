import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getDataSelection } from '../../utils'
import { getNroData, getProgrammeData } from '../../state/selectors'
import './Bars.scss'

const Bars = ({ data, dataSelection, openDialog }) => (
  <div className="pie-grid">
    {data.map(d => (
      <div className="pie-grid-item" key={d.name}>
        <PieChart
          data={
            d[dataSelection]
              ? d[dataSelection].values.map((value, i) => ({
                  label: d[dataSelection].labels[i],
                  value,
                }))
              : []
          }
        />
        <div className="title">{d.name}</div>
        <div className="button-container">
          <button className="link" type="button" onClick={openDialog}>
            Context
          </button>
        </div>
      </div>
    ))}
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  data: ownProps.location.pathname.includes('programme') ? getProgrammeData(state) : getNroData(state),
  dataSelection: getDataSelection(ownProps.location),
})

export default withRouter(connect(mapStateToProps)(Bars))
