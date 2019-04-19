import React from 'react'
import PieChart from './PieChart'
import './PieGrid.scss'

const PieGridItem = () => (
  <div className="pie-grid-item">
    <PieChart />
  </div>
)

const PieGrid = () => (
  <div className="pie-grid">
    <PieGridItem />
    <PieGridItem />
    <PieGridItem />
    <PieGridItem />
    <PieGridItem />
    <PieGridItem />
    <PieGridItem />
  </div>
)

export default PieGrid
