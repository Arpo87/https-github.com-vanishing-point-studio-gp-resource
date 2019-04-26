import React from 'react'
import { connect } from 'react-redux'
import { fetchNros } from '../../state/actions'
import { getDataSelection } from '../../utils'
import Map from '../map/Map'
import PieGrid from '../pies/PieGrid'
import InfoDialog from '../dialog/InfoDialog'
import './NroPage.scss'

class NroPage extends React.Component {
  state = { dialogOpen: false }

  componentDidMount() {
    this.props.loadData()
  }

  componentDidUpdate(lastProps) {
    if (this.props.location.pathname !== lastProps.location.pathname) {
      this.closeDialog()
    }
  }

  render() {
    const { location, loadingData } = this.props
    const { dialogOpen } = this.state
    const dataSelection = getDataSelection(location)
    const dataSelectionCapitalized = dataSelection.charAt(0).toUpperCase() + dataSelection.slice(1)
    const breakdowns = location.pathname === '/breakdowns'
    return (
      <div className={'nro-page' + (!breakdowns ? ' map-showing' : '')}>
        <div className="scroll-container">
          {loadingData ? null : (
            <div className="page-content">
              <h1>
                <span className="light">Showing </span>
                <span className="data-selection">{dataSelectionCapitalized + ' per NRO'}</span>
                <span className="light">{breakdowns ? ' with ' : ' at a '}</span>
                <span>{breakdowns ? 'breakdowns' : 'relative scale'}</span>
              </h1>
              {breakdowns ? <PieGrid openDialog={this.openDialog} /> : <Map openDialog={this.openDialog} />}
            </div>
          )}
        </div>
        {dialogOpen && <InfoDialog close={this.closeDialog} />}
      </div>
    )
  }

  openDialog = () => {
    this.setState({ dialogOpen: true })
    document.body.classList.add('dialog-open')
  }

  closeDialog = () => {
    this.setState({ dialogOpen: false })
    document.body.classList.remove('dialog-open')
  }
}

const mapStateToProps = state => ({ loadingData: state.loadingData })

const mapDispatchToProps = dispatch => ({ loadData: () => dispatch(fetchNros()) })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NroPage)
