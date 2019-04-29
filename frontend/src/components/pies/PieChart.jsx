import React from 'react'
import ResizeDetector from 'react-resize-detector'
import { select } from 'd3-selection'
import { transition } from 'd3-transition'
import { interpolate } from 'd3-interpolate'
import { pie, arc } from 'd3-shape'
import './PieChart.scss'

const MAX_SLICES = 8

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
        <svg className="data-svg color-scale-paths" ref={e => (this.svgElement = e)}>
          <g ref={e => (this.groupElement = e)} />
        </svg>
      </div>
    )
  }

  draw = () => {
    const width = this.svgElement.clientWidth || this.svgElement.parentNode.clientWidth
    const height = this.svgElement.clientHeight || this.svgElement.parentNode.clientHeight
    const radius = Math.min(width, height) / 2

    // Add zero values up to MAX_SLICES so that animated transitions work nicely.
    const paddedData = [...this.props.data]
    for (let i = this.props.data.length - 1; i < MAX_SLICES; i++) {
      paddedData.push({ value: 0, label: '' })
    }

    const pieData = pie()
      .sort(null)
      .value(d => d.value)(paddedData)

    const arcGenerator = arc()
      .outerRadius(radius)
      .innerRadius(0)

    const arcTween = (d, i, nodes) => {
      var interpolator = interpolate(nodes[i]._current, d)
      nodes[i]._current = interpolator(0)
      return t => arcGenerator(interpolator(t))
    }

    select(this.groupElement)
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
      .selectAll('path')
      .data(pieData)
      .join(enter => enter.append('path').each((d, i, nodes) => (nodes[i]._current = d)))
      .transition()
      .duration(400)
      .attrTween('d', arcTween)
  }
}

export default PieChart
