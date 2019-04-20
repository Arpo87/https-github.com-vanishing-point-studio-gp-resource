import React from 'react'
import ResizeDetector from 'react-resize-detector'
import { select } from 'd3-selection'
import { transition } from 'd3-transition'
import { withRouter } from 'react-router-dom'
import { getDataSelection } from '../../utils'
import { data, mapCoordinates } from '../../utils/fakeData'
import DetailsPopup from './DetailsPopup'
import map from '../../assets/map.svg'
import './Map.scss'

// Need to import transition to be able to call it on a selection for some reason.
transition()

const averageRadius = 2 // Radius of average value as percentage of svg width.
const scaleFunction = null // E.g. Math.log, Math.log10, or null for linear scale (x => x).
const dataWithCoordinates = data
  .filter(d => mapCoordinates[d.location])
  .map(d => ({ ...d, coordinates: mapCoordinates[d.location] }))

const valueToRadius = (value, dataSelection, svgWidth) => {
  const values = data.map(d => d[dataSelection].reduce((a, b) => a + b, 0))
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
    const { dataSelection, nro } = this.props
    return (
      <div className="map-view" ref={e => (this.viewElement = e)}>
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
          {nro && (
            <DetailsPopup
              data={this.nroSelection()}
              dataSelection={dataSelection}
              popupRef={e => (this.popupElement = e)}
            />
          )}
        </div>
      </div>
    )
  }

  draw = () => {
    const dataSelection = this.props.dataSelection
    const width = this.svgElement.clientWidth || this.svgElement.parentNode.clientWidth
    const height = this.svgElement.clientHeight || this.svgElement.parentNode.clientHeight

    const circles = select(this.svgElement)
      .selectAll('circle')
      .data(this.props.data)

    circles.join('circle')
    circles.attr('cx', d => width * d.coordinates[0]).attr('cy', d => height * d.coordinates[1])
    circles
      .transition()
      .duration(400)
      .attr('r', d => {
        if (!d[dataSelection]) {
          return 0
        }
        const total = d[dataSelection].reduce((a, b) => a + b, 0)
        return valueToRadius(total, dataSelection, width)
      })

    const nroData = this.nroSelection()
    const nroX = nroData.coordinates[0] * width
    const nroY = nroData.coordinates[1] * height

    let anchorX
    if (nroX + 240 < width) {
      anchorX = nroX + 15
      this.popupElement.classList.remove('anchor-right')
    } else {
      anchorX = nroX - 255
      this.popupElement.classList.add('anchor-right')
    }
    const anchorY = nroY - 35

    select(this.popupElement).attr('style', 'left: ' + anchorX + 'px; top: ' + anchorY + 'px;')
  }

  nroSelection = () => this.props.data.filter(d => d.location === this.props.nro)[0] || this.props.data[0]
}

const MapWithFakeData = ({ location }) => (
  <Map data={dataWithCoordinates} dataSelection={getDataSelection(location)} nro="New Zealand" />
)

export default withRouter(MapWithFakeData)
