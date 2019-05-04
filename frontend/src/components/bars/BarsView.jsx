import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getDataSelection, formatValue } from '../../utils'
import { getNroData, getProgrammeData } from '../../state/selectors'
import BarsViewLegend from './BarsViewLegend'
import BarStack from './BarStack'
import './BarsView.scss'

const BarsView = ({ data, dataSelection, isProgramme }) => (
  <div className="bars-view">
    <div className="legend-row">
      <div className="column" />
      <div className="column">
        <div className="title">Legend</div>
        <BarsViewLegend data={data} dataSelection={dataSelection} isProgramme={isProgramme} />
      </div>
    </div>
    {data.map(d => (
      <div className="bar-row" key={d.name}>
        <div className="column">
          <div className="bar-title">
            <div className="name">{d.name}</div>
            <div className="total">{formatValue(d[dataSelection].total, dataSelection)}</div>
          </div>
        </div>
        <div className="column">
          <BarStack data={d[dataSelection]} />
        </div>
      </div>
    ))}
  </div>
)

const mapStateToProps = (state, ownProps) => {
  const isProgramme = ownProps.location.pathname.includes('programme')
  return {
    data: isProgramme ? getProgrammeData(state) : getNroData(state),
    dataSelection: getDataSelection(ownProps.location),
    isProgramme,
  }
}

export default withRouter(connect(mapStateToProps)(BarsView))
