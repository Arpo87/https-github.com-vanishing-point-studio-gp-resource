import React from 'react'
import ResizeDetector from 'react-resize-detector'
import { connect } from 'react-redux'
import { select, event } from 'd3-selection'
import { transition } from 'd3-transition'
import { withRouter } from 'react-router-dom'
import { getDataSelection } from '../../utils'
import { traversalOrder } from '../../utils/coordinates'
import { getDataWithCoordinates, getProgramDataWithCoordinates } from '../../state/selectors'
import DetailsPopup from './DetailsPopup'
import map from '../../assets/map.svg'
import './Map.scss'

const POPUP_WIDTH = 260
const POPUP_ANCHOR_WIDTH = 10
const AVERAGE_RADIUS = 2 // Radius of average value as percentage of svg width.

// Need to import transition to be able to call it on a selection for some reason.
transition()

class Map extends React.PureComponent {
  state = { selectedNro: null }
  timeOfLastWheelChange = 0

  componentDidMount() {
    window.addEventListener('wheel', this.handleMouseWheel)
    this.draw()
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.handleMouseWheel)
  }

  componentDidUpdate() {
    this.draw()
  }

  render() {
    const { dataSelection, openDialog } = this.props
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
            <DetailsPopup
              data={nroData}
              dataSelection={dataSelection}
              popupRef={e => (this.popupElement = e)}
              close={this.closePopup}
              onLinkClick={openDialog}
            />
          )}
        </div>
      </div>
    )
  }

  draw = () => {
    const { dataSelection, data } = this.props
    const { selectedNro } = this.state
    const width = this.svgElement.clientWidth || this.svgElement.parentNode.clientWidth
    const height = this.svgElement.clientHeight || this.svgElement.parentNode.clientHeight

    select(this.svgElement)
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', d => width * d.coordinates[0])
      .attr('cy', d => height * d.coordinates[1])
      .attr('class', d => (d.name === selectedNro ? 'selected' : undefined))
      .on('click', d => {
        this.setState({ selectedNro: d.name })
        event.stopPropagation()
      })
      .transition()
      .duration(400)

      .attr('r', d => {
        if (!d[dataSelection]) {
          return 0
        }
        return this.valueToRadius(d[dataSelection].total, width)
      })

    this.positionPopup(width, height)
  }

  positionPopup = (width, height) => {
    const { dataSelection } = this.props
    const nroData = this.getSelectedNroData()
    if (nroData) {
      const x = nroData.coordinates[0] * width
      const y = nroData.coordinates[1] * height
      const radius = this.valueToRadius(nroData[dataSelection].total, width)

      let anchorX
      if (x + POPUP_WIDTH < width) {
        anchorX = x + POPUP_ANCHOR_WIDTH + (radius - 5)
        this.popupElement.classList.remove('anchor-right')
      } else {
        anchorX = x - POPUP_WIDTH - POPUP_ANCHOR_WIDTH - (radius - 5)
        this.popupElement.classList.add('anchor-right')
      }

      let anchorY
      const svgOffsetY = this.svgElement.getBoundingClientRect().top
      const popupHeight = this.popupElement.getBoundingClientRect().height
      if (svgOffsetY + y + popupHeight < window.innerHeight - 10) {
        anchorY = y - 20 - POPUP_ANCHOR_WIDTH
        this.popupElement.classList.remove('anchor-bottom')
      } else {
        anchorY = y - popupHeight + 20 + POPUP_ANCHOR_WIDTH
        this.popupElement.classList.add('anchor-bottom')
      }
      const style = 'left: ' + anchorX + 'px; top: ' + anchorY + 'px;'

      select(this.popupElement)
        .transition()
        .duration(400)
        .attr('style', style)
    }
  }

  valueToRadius = (value, svgWidth) => {
    const { data, dataSelection } = this.props
    const values = data.map(d => d[dataSelection].total)
    const averageValue = values.reduce((a, b) => a + b, 0) / values.length
    const averageAreaInPx = Math.PI * Math.pow((svgWidth * AVERAGE_RADIUS) / 100, 2)
    const areaInPx = (value / averageValue) * averageAreaInPx
    return Math.sqrt(areaInPx / Math.PI)
  }

  closePopup = () => this.setState({ selectedNro: null })

  getSelectedNroData = () => this.props.data.filter(d => d.name === this.state.selectedNro)[0]

  handleMouseWheel = e => {
    // Discard event if it's from a trackpad and another change occurred within the last 500ms.
    const discard = Math.abs(e.wheelDelta) < 50 && Date.now() - this.timeOfLastWheelChange < 500
    if (e.deltaY !== 0 && !discard) {
      const { data } = this.props
      const { selectedNro } = this.state
      const currentIndex = traversalOrder.findIndex(nro => nro === selectedNro)
      let nextIndex = currentIndex + (e.deltaY > 0 ? 1 : -1)
      if (nextIndex < 0) {
        nextIndex = traversalOrder.length - 1
      } else if (nextIndex > data.length - 1) {
        nextIndex = 0
      }
      if (traversalOrder[nextIndex]) {
        this.timeOfLastWheelChange = Date.now()
        this.setState({ selectedNro: traversalOrder[nextIndex] })
      }
    }
  }
}

const MapWithDataSelection = ({ location, ...rest }) => <Map dataSelection={getDataSelection(location)} {...rest} />

const mapStateToProps = (state, ownProps) => ({
  data: ownProps.location.pathname.includes('program')
    ? getProgramDataWithCoordinates(state)
    : getDataWithCoordinates(state),
})
export default withRouter(connect(mapStateToProps)(MapWithDataSelection))
