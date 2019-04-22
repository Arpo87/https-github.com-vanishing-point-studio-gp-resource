import React from 'react'
import PieChart from '../pies/PieChart'
import { formatValue } from '../../utils'
import { labels } from '../../utils/fakeData'
import './DetailsPopup.scss'

class DetailsPopup extends React.Component {
  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick)
  }

  render() {
    const { data, dataSelection, popupRef } = this.props
    return (
      <div className="details-popup" ref={popupRef}>
        <div id="mapDetailsPopup" className="inner-container">
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
          <button className="link" type="button" onClick={this.handleLinkClick}>
            zoom + context
          </button>
        </div>
      </div>
    )
  }

  handleDocumentClick = e => {
    if (
      !document.getElementById('mainMenu').contains(e.target) &&
      !document.getElementById('mapDetailsPopup').contains(e.target)
    ) {
      this.props.close()
    }
  }

  handleLinkClick = () => {
    this.props.close()
    this.props.onLinkClick()
  }
}

export default DetailsPopup
