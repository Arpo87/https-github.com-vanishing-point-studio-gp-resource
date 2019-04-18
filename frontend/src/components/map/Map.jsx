import React from 'react'
import map from '../../assets/map.svg'
import './Map.scss'

const Map = () => (
  <div className="map-view">
    <div className="map-container">
      <img src={map} width="100%" alt="" />
      <svg className="data-svg" />
    </div>
  </div>
)

export default Map
