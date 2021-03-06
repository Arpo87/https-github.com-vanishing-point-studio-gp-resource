import React from 'react'
import kebabCase from 'lodash/kebabCase'
import { connect } from 'react-redux'
import { fetchNroData } from '../../state/actions'
import { getDataSelection } from '../../utils'
import MapView from '../map/MapView'
import BarsView from '../bars/BarsView'
import PageTitle from './PageTitle'
import InfoDialog from '../dialog/InfoDialog'
import Spinner from '../widgets/Spinner'
import './DataContainer.scss'

class DataContainer extends React.Component {
  state = { dialogOpen: false }

  componentDidMount() {
    this.props.fetchNroData()
  }

  componentDidUpdate(lastProps) {
    if (this.props.location.pathname !== lastProps.location.pathname) {
      this.closeDialog()
    }
  }

  render() {
    const { location, loadingData } = this.props
    const { dialogOpen } = this.state
    const breakdowns = location.pathname.includes('breakdowns')
    const programme = location.pathname.includes('programme')

    let className = 'data-container ' + (programme ? 'programme' : 'nro')
    if (!breakdowns) {
      className += ' map'
    }
    className += ' ' + kebabCase(getDataSelection(location))

    return (
      <div className={className}>
        <div className="main-scroll custom-scrollbar">
          {loadingData ? (
            <Spinner large />
          ) : (
            <div className="page-content">
              <PageTitle location={location} />
              {breakdowns ? <BarsView openDialog={this.openDialog} /> : <MapView openDialog={this.openDialog} />}
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
    window.scrollTo(0, 0)
  }

  closeDialog = () => {
    this.setState({ dialogOpen: false })
    document.body.classList.remove('dialog-open')
  }
}

const mapStateToProps = state => ({ loadingData: state.loadingNroData })

const mapDispatchToProps = dispatch => ({ fetchNroData: () => dispatch(fetchNroData()) })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataContainer)
