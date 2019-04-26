import React from 'react'
import PieChart from '../pies/PieChart'
import { formatValue } from '../../utils'
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
              <div key={data[dataSelection].labels[i]} className="row">
                <div className="label">{data[dataSelection].labels[i]}</div>
                <div className="value">{formatValue(value, dataSelection)}</div>
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
