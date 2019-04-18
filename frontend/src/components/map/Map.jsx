import React from 'react'
import ResizeDetector from 'react-resize-detector'
import { select } from 'd3-selection'
import { transition } from 'd3-transition'
import { withRouter } from 'react-router-dom'
import { getDataSelectionIndex } from '../../utils/selectionUtils'
import map from '../../assets/map.svg'
import './Map.scss'

// Need to import transition to be able to call it on a selection for some reason.
transition()

const averageRadius = 3 // Radius of average value as percentage of svg width.
const scaleFunction = null // E.g. Math.log, Math.log10, or null for linear scale (x => x).

const data = [
  // Values are: [ income, expenses, staff ]
  { location: 'North America', coordinates: [0.17, 0.31], values: [100, 70, 85] },
  { location: 'Australia', coordinates: [0.89, 0.74], values: [50, 60, 40] },
  { location: 'Germany', coordinates: [0.51, 0.24], values: [520, 610, 280] },
]

const valueToRadius = (value, i, svgWidth) => {
  const values = data.map(d => d.values[i])
  const averageValue = values.reduce((a, b) => a + b, 0) / values.length

  const scaledValue = scaleFunction ? scaleFunction(value) : value
  const scaledAverageValue = scaleFunction ? scaleFunction(averageValue) : averageValue
  const averageAreaInPx = Math.PI * Math.pow((svgWidth * averageRadius) / 100, 2)
  const areaInPx = (scaledValue / scaledAverageValue) * averageAreaInPx

  return Math.sqrt(areaInPx / Math.PI)
}

class Map extends React.PureComponent {
  componentDidMount() {
    this.draw()
  }

  componentDidUpdate() {
    this.draw()
  }

  render() {
    return (
      <div className="map-view">
        <div className="map-container">
          <ResizeDetector handleWidth handleHeight onResize={this.draw} />
          <img src={map} width="100%" alt="" />
          <svg className="data-svg" ref={e => (this.svgElement = e)} />
        </div>
      </div>
    )
  }

  draw = () => {
    const i = this.props.dataSelectionIndex
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
      .attr('r', d => valueToRadius(d.values[i], i, width))
  }
}

const MapWithFakeData = ({ location }) => <Map data={data} dataSelectionIndex={getDataSelectionIndex(location)} />

export default withRouter(MapWithFakeData)
