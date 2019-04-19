import React from 'react'
import ResizeDetector from 'react-resize-detector'
import { select } from 'd3-selection'
import { transition } from 'd3-transition'
import { pie, arc } from 'd3-shape'
import './PieChart.scss'

// Need to import transition to be able to call it on a selection for some reason.
transition()

class PieChart extends React.PureComponent {
  componentDidMount() {
    this.draw()
  }

  componentDidUpdate() {
    this.draw()
  }

  render() {
    return (
      <div className="pie-chart-container">
        <ResizeDetector handleWidth handleHeight onResize={this.draw} />
        <svg className="data-svg" ref={e => (this.svgElement = e)}>
          <g ref={e => (this.groupElement = e)} />
        </svg>
      </div>
    )
  }

  draw = () => {
    const width = this.svgElement.clientWidth || this.svgElement.parentNode.clientWidth
    const height = this.svgElement.clientHeight || this.svgElement.parentNode.clientHeight
    const radius = Math.min(width, height) / 2

    select(this.groupElement)
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
      .selectAll('path')
      .data(
        pie()
          .sort(null)
          .value(d => d.value)(this.props.data)
      )
      .join('path')
      .attr(
        'd',
        arc()
          .outerRadius(radius)
          .innerRadius(0)
      )
      .attr('class', d => d.data.label.toLowerCase())
  }
}

export default PieChart
