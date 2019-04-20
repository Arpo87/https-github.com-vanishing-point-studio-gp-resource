import React from 'react'
import PieChart from '../pies/PieChart'
import { formatCurrency } from '../../utils'
import { labels } from '../../utils/fakeData'
import './DetailsPopup.scss'

const formatValue = (value, dataSelection) => (dataSelection === 'staff' ? value : formatCurrency(value))

class DetailsPopup extends React.Component {
  state = { fadedIn: false }

  componentDidMount() {
    setTimeout(() => this.setState({ fadedIn: true }), 50)
  }

  render() {
    const { data, dataSelection, popupRef } = this.props
    const { fadedIn } = this.state
    return (
      <div className="details-popup" ref={popupRef} onClick={e => e.stopPropagation()}>
        <div className={'fade-container' + (fadedIn ? ' faded-in' : '')}>
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
}

export default DetailsPopup
