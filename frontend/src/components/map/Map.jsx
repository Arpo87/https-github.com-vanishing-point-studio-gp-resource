import React from 'react'
import ResizeDetector from 'react-resize-detector'
import { select } from 'd3-selection'
import { transition } from 'd3-transition'
import { withRouter } from 'react-router-dom'
import { getDataSelection, getSelectedNro, selectNro } from '../../utils'
import { data, mapCoordinates } from '../../utils/fakeData'
import DetailsPopup from './DetailsPopup'
import map from '../../assets/map.svg'
import './Map.scss'

const POPUP_WIDTH = 260
const POPUP_ANCHOR_WIDTH = 10
const AVERAGE_RADIUS = 2 // Radius of average value as percentage of svg width.

// Need to import transition to be able to call it on a selection for some reason.
transition()

const dataWithCoordinates = data
  .filter(d => mapCoordinates[d.location])
  .map(d => ({ ...d, coordinates: mapCoordinates[d.location] }))

const valueToRadius = (value, dataSelection, svgWidth) => {
  const values = data.map(d => d[dataSelection].reduce((a, b) => a + b, 0))
  const averageValue = values.reduce((a, b) => a + b, 0) / values.length
  const averageAreaInPx = Math.PI * Math.pow((svgWidth * AVERAGE_RADIUS) / 100, 2)
  const areaInPx = (value / averageValue) * averageAreaInPx
  return Math.sqrt(areaInPx / Math.PI)
}

class Map extends React.PureComponent {
  componentDidMount() {
    window.addEventListener('wheel', this.handleWheel)
    this.draw()
  }

  componentWillUnmount() {
    window.addEventListener('wheel', this.handleWheel)
  }

  componentDidUpdate() {
    this.draw()
  }

  render() {
    const { dataSelection } = this.props
    const nroData = this.getSelectedNroData()
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
          {nroData && (
            <DetailsPopup data={nroData} dataSelection={dataSelection} popupRef={e => (this.popupElement = e)} />
          )}
        </div>
      </div>
    )
  }

  draw = () => {
    const dataSelection = this.props.dataSelection
    const width = this.svgElement.clientWidth || this.svgElement.parentNode.clientWidth
    const height = this.svgElement.clientHeight || this.svgElement.parentNode.clientHeight

    select(this.svgElement)
      .selectAll('circle')
      .data(this.props.data)
      .join('circle')
      .attr('cx', d => width * d.coordinates[0])
      .attr('cy', d => height * d.coordinates[1])
      .transition()
      .duration(400)
      .attr('r', d => {
        if (!d[dataSelection]) {
          return 0
        }
        const total = d[dataSelection].reduce((a, b) => a + b, 0)
        return valueToRadius(total, dataSelection, width)
      })

    const nroData = this.getSelectedNroData()
    if (nroData) {
      const nroX = nroData.coordinates[0] * width
      const nroY = nroData.coordinates[1] * height

      let anchorX
      if (nroX + POPUP_WIDTH < width) {
        anchorX = nroX + POPUP_ANCHOR_WIDTH
        this.popupElement.classList.remove('anchor-right')
      } else {
        anchorX = nroX - POPUP_WIDTH - POPUP_ANCHOR_WIDTH
        this.popupElement.classList.add('anchor-right')
      }

      let anchorY
      const svgOffsetY = this.svgElement.getBoundingClientRect().top
      const popupHeight = this.popupElement.getBoundingClientRect().height
      if (svgOffsetY + nroY + popupHeight < window.innerHeight - 10) {
        anchorY = nroY - 20 - POPUP_ANCHOR_WIDTH
        this.popupElement.classList.remove('anchor-bottom')
      } else {
        anchorY = nroY - popupHeight + 20 + POPUP_ANCHOR_WIDTH
        this.popupElement.classList.add('anchor-bottom')
      }

      select(this.popupElement)
        .transition()
        .duration(400)
        .attr('style', 'left: ' + anchorX + 'px; top: ' + anchorY + 'px;')
    }
  }

  getSelectedNroData = () => this.props.data.filter(d => d.location === this.props.nro)[0]

  handleWheel = e => {
    if (e.deltaY !== 0) {
      const { data, nro, location, history } = this.props
      const currentIndex = data.findIndex(d => d.location === nro)
      let nextIndex = currentIndex + (e.deltaY > 0 ? 1 : -1)
      if (nextIndex < 0) {
        nextIndex = data.length - 1
      } else if (nextIndex > data.length - 1) {
        nextIndex = 0
      }
      if (data[nextIndex]) {
        selectNro(data[nextIndex].location, location, history)
      }
    }
  }
}

const MapWithFakeData = ({ location, history }) => (
  <Map
    data={dataWithCoordinates}
    dataSelection={getDataSelection(location)}
    nro={getSelectedNro(location)}
    location={location}
    history={history}
  />
)

export default withRouter(MapWithFakeData)
