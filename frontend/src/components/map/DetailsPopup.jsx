import React from 'react'
import PieChart from '../pies/PieChart'
import CloseIcon from '../../assets/icons/Close'
import { formatCurrency } from '../../utils'
import { labels } from '../../utils/fakeData'
import './DetailsPopup.scss'

const formatValue = (value, dataSelection) => (dataSelection === 'staff' ? value : formatCurrency(value))

class DetailsPopup extends React.Component {
  state = { fadedIn: false }

  componentDidMount() {
    setTimeout(() => this.setState({ fadedIn: true }), 50)
  }

  componentWillUnmount() {}

  render() {
    const { data, dataSelection, popupRef, handleClose } = this.props
    const { fadedIn } = this.state
    return (
      <div className="details-popup" ref={popupRef}>
        <div className={'fade-container' + (fadedIn ? ' faded-in' : '')}>
          <div className="pie-container">
            <PieChart
              data={data[dataSelection].map((d, i) => ({
                label: labels[dataSelection][i],
                value: d,
              }))}
            />
          </div>
          <button className="close-button plain" type="button" onClick={handleClose}>
            <CloseIcon />
          </button>
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
}

export default DetailsPopup
