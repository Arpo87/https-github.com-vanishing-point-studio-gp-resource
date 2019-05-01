import React from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../../state/actions'
import Map from '../map/Map'
import PieGrid from '../pies/PieGrid'
import PageTitle from './PageTitle'
import InfoDialog from '../dialog/InfoDialog'
import './DataContainer.scss'

class DataContainer extends React.Component {
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
    const breakdowns = location.pathname.includes('breakdowns')
    const programme = location.pathname.includes('programme')
    return (
      <div className={'data-container' + (programme ? ' programme' : '')}>
        <div className="scroll-container">
          {loadingData ? null : (
            <div className="page-content">
              <PageTitle location={location} />
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
    window.scrollTo(0, 0)
  }

  closeDialog = () => {
    this.setState({ dialogOpen: false })
    document.body.classList.remove('dialog-open')
  }
}

const mapStateToProps = state => ({ loadingData: state.loadingData })

const mapDispatchToProps = dispatch => ({ loadData: () => dispatch(fetchData()) })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataContainer)
