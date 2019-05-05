import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getDataSelection } from '../../utils'
import { nroSortOptions, programmeSortOptions } from '../../utils/sort'
import { getNroData, getProgrammeData } from '../../state/selectors'
import BarsViewLegend from './BarsViewLegend'
import BarsList from './BarsList'
import Select from '../widgets/Select'
import './BarsView.scss'

class BarsView extends React.Component {
  state = { sortKey: this.props.sortOptions[0].key }

  componentDidUpdate() {
    if (this.getSortSelection().key !== this.state.sortKey) {
      this.updateSortKey(this.getSortSelection().key)
    }
  }

  render() {
    const { data, dataSelection, sortOptions, isProgramme } = this.props
    const sortSelection = this.getSortSelection()
    return (
      <div className="bars-view">
        <div className="legend-row">
          <div className="column">
            <div className="title">Sort</div>
            <Select options={sortOptions} value={sortSelection.key} onChange={this.updateSortKey} />
          </div>
          <div className="column">
            <div className="title">Legend</div>
            <BarsViewLegend data={data} dataSelection={dataSelection} isProgramme={isProgramme} />
          </div>
        </div>
        <BarsList data={data} dataSelection={dataSelection} sortBy={sortSelection} />
      </div>
    )
  }

  updateSortKey = value => this.setState({ sortKey: value })

  getSortSelection = () => {
    const { sortOptions } = this.props
    const { sortKey } = this.state
    return sortOptions.find(o => o.key === sortKey) || sortOptions[0]
  }
}

const mapStateToProps = (state, ownProps) => {
  const isProgramme = ownProps.location.pathname.includes('programme')
  const sortOptions = isProgramme ? programmeSortOptions : nroSortOptions
  return {
    data: isProgramme ? getProgrammeData(state) : getNroData(state),
    dataSelection: getDataSelection(ownProps.location),
    sortOptions,
    isProgramme,
  }
}

export default withRouter(connect(mapStateToProps)(BarsView))
