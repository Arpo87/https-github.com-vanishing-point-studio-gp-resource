import React from 'react'
import PieChart from '../pies/PieChart'
import { formatValue, formatPercent } from '../../utils'
import './MapPopup.scss'

const hideContext = true

class MapPopup extends React.Component {
  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick)
    document.addEventListener('touchstart', this.handleDocumentTouch)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick)
    document.removeEventListener('touchstart', this.handleDocumentTouch)
  }

  render() {
    const { data, dataSelection, isProgramme, popupRef } = this.props
    return (
      <div className="map-popup" ref={popupRef}>
        <div id="mapDetailsPopup" className="inner-container">
          <div className="pie-container">
            <PieChart
              data={data[dataSelection].values.map((value, i) => ({
                label: data[dataSelection].labels[i],
                value,
              }))}
            />
          </div>
          <h2>{data.name}</h2>
          <div className="total">{formatValue(data[dataSelection].total, dataSelection)}</div>
          <div className="line" />
          <div className="table">
            {data[dataSelection].values.map((value, i) => (
              <div key={data[dataSelection].labels[i]} className="legend-item color-scale-item">
                <div className="legend-color color-scale-background" />
                <div className="label">{data[dataSelection].labels[i]}</div>
                <div className="value">
                  {isProgramme
                    ? formatValue(value, dataSelection, true)
                    : formatPercent(value, data[dataSelection].total)}
                </div>
              </div>
            ))}
          </div>
          {!hideContext && (
            <button className="link" type="button" onClick={this.handleLinkClick}>
              Context
            </button>
          )}
        </div>
      </div>
    )
  }

  handleDocumentClick = e => {
    const clickInMenu = document.getElementById('mainMenu').contains(e.target)
    const clickOnPopup = document.getElementById('mapDetailsPopup').contains(e.target)
    if (!clickInMenu && !clickOnPopup) {
      this.props.close()
    }
  }

  handleDocumentTouch = e => {
    if (e.changedTouches.length > 0) {
      const clickOnPopup = document.getElementById('mapDetailsPopup').contains(e.changedTouches[0].target)
      const clickOnCircle = e.changedTouches[0].target.nodeName === 'circle'
      if (!clickOnPopup && !clickOnCircle) {
        this.props.close()
      }
    }
  }

  handleLinkClick = () => {
    this.props.close()
    this.props.onLinkClick()
  }
}

export default MapPopup
