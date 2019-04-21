import React from 'react'
import PieChart from '../pies/PieChart'
import { formatValue } from '../../utils'
import { labels } from '../../utils/fakeData'
import './DetailsPopup.scss'

const FADE_TIME = 150

class DetailsPopup extends React.Component {
  state = { fadedIn: false, fadedOut: false }

  componentDidMount() {
    setTimeout(() => this.setState({ fadedIn: true }), 1)
    document.addEventListener('click', this.handleDocumentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick)
  }

  render() {
    const { data, dataSelection, popupRef } = this.props
    const { fadedIn, fadedOut } = this.state
    return (
      <div id="mapDetailsPopup" className="details-popup" ref={popupRef}>
        <div className={'fade-container' + (fadedIn && !fadedOut ? ' faded-in' : '')}>
          <div className="pie-container">
            <PieChart
              data={data[dataSelection].map((d, i) => ({
                label: labels[dataSelection][i],
                value: d,
              }))}
            />
          </div>
          <h2>{data.location}</h2>
          <div className="total">{formatValue(data[dataSelection].reduce((a, b) => a + b, 0), dataSelection)}</div>
          <div className="line" />
          <div className="table">
            {data[dataSelection].map((d, i) => (
              <div key={labels[dataSelection][i]} className="row">
                <div className="label">{labels[dataSelection][i]}</div>
                <div className="value">{formatValue(d, dataSelection)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  handleDocumentClick = e => {
    if (
      !document.getElementById('mainMenu').contains(e.target) &&
      !document.getElementById('mapDetailsPopup').contains(e.target)
    ) {
      this.startClose()
    }
  }

  startClose = () => {
    this.setState({ fadedOut: true })
    setTimeout(() => this.props.onCloseRequested(), FADE_TIME)
  }
}

export default DetailsPopup
