import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getDataSelection } from '../../utils'
import { getNroData, getProgrammeData } from '../../state/selectors'
import Legend from './Legend'
import './BarsView.scss'

const BarsView = ({ data, dataSelection, isProgramme, openDialog }) => (
  <div className="bars-view">
    <div className="legend-row">
      <div className="column" />
      <div className="column">
        <div className="title">Legend</div>
        {data && data.length > 0 && data[0][dataSelection] && (
          <Legend labels={data[0][dataSelection].labels} isProgramme={isProgramme} />
        )}
      </div>
    </div>
    {data.map(d => (
      <div className="bar-row" key={d.name} />
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
