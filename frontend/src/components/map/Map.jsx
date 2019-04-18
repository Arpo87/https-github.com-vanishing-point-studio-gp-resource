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

const data = [
  // Values are: [ income, expenses, staff ]
  { location: 'North America', coordinates: [0.17, 0.31], values: [100, 70, 85] },
  { location: 'Australia', coordinates: [0.89, 0.74], values: [50, 60, 40] },
]

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
      .attr('r', d => d.values[this.props.dataSelectionIndex])
  }
}

const MapWithFakeData = ({ location }) => <Map data={data} dataSelectionIndex={getDataSelectionIndex(location)} />

export default withRouter(MapWithFakeData)
