import React from 'react'
import ResizeDetector from 'react-resize-detector'
import { select } from 'd3-selection'
import { transition } from 'd3-transition'
import { withRouter } from 'react-router-dom'
import { getDataSelection, formatCurrency } from '../../utils'
import { data, labels, mapCoordinates } from '../../utils/fakeData'
import PieChart from '../pies/PieChart'
import map from '../../assets/map.svg'
import './Map.scss'

// Need to import transition to be able to call it on a selection for some reason.
transition()

const dataWithCoordinates = data
  .filter(d => mapCoordinates[d.location])
  .map(d => ({ ...d, coordinates: mapCoordinates[d.location] }))

class Map extends React.PureComponent {
  componentDidMount() {
    this.draw()
  }

  componentDidUpdate() {
    this.draw()
  }

  render() {
    const { data, dataSelection, nro } = this.props
    const detailData = data.filter(d => d.location === nro)[0] || data[0]
    return (
      <div className="map-view">
        <div className="map-container">
          <ResizeDetector handleWidth handleHeight onResize={this.draw} />
          <img src={map} width="100%" alt="" />
          <svg
            className="data-svg"
            ref={e => (this.svgElement = e)}
            onClick={e => {
              // Temporary thing - logs the coordinates of the click, used for creating mapCoordinates.
              const r = this.svgElement.getBoundingClientRect()
              const x = (e.pageX - r.left) / r.width
              const y = (e.pageY - r.top) / r.height
              console.log(x, y)
            }}
          />
        </div>
        {detailData && (
          <div className="details">
            <div className="pie-container">
              <PieChart
                data={detailData[dataSelection].map((d, i) => ({
                  label: labels[dataSelection][i],
                  value: d,
                }))}
              />
            </div>
            <h2>{detailData.location}</h2>
            <div className="total">{formatCurrency(detailData[dataSelection].reduce((a, b) => a + b, 0))}</div>
            <div className="line" />
            <div className="table">
              {detailData[dataSelection].map((d, i) => (
                <div key={labels[dataSelection][i]} className="row">
                  <div className="label">{labels[dataSelection][i]}</div>
                  <div className="value">{formatCurrency(d)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  draw = () => {
    const width = this.svgElement.clientWidth || this.svgElement.parentNode.clientWidth
    const height = this.svgElement.clientHeight || this.svgElement.parentNode.clientHeight

    const circles = select(this.svgElement)
      .selectAll('circle')
      .data(this.props.data)

    circles.exit().remove()
    circles.enter().append('circle')
    circles.attr('cx', d => width * d.coordinates[0]).attr('cy', d => height * d.coordinates[1])
    circles
      .transition()
      .duration(400)
      .attr('r', 20)
  }
}

const MapWithFakeData = ({ location }) => (
  <Map data={dataWithCoordinates} dataSelection={getDataSelection(location)} nro="Mexico" />
)

export default withRouter(MapWithFakeData)
