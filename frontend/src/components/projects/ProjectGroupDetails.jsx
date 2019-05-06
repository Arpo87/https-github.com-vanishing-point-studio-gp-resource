import React from 'react'
import Breadcrumb from './Breadcrumb'
import BarStack from '../bars/BarStack'
import './ProjectGroupDetails.scss'

const data = {
  total: 180,
  values: [ 20, 50, 40, 70 ],
  labels: [ 20, 50, 40, 70 ],
}
const ProjectGroupDetails = () => {
  return (
    <div className="project-group-details">
      <Breadcrumb name="Group" />
      {/* Add <Legend /> copy BarsViewLegend */}
      <BarStack data={data}/>
    </div>
  )
}

export default ProjectGroupDetails
