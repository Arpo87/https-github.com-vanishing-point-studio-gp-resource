import React from 'react'
import { connect } from 'react-redux'
import { lookupNroByKey, getNroProjectDetails } from '../../state/selectors'
import NotFound from '../frame/NotFound'
import Breadcrumb from './Breadcrumb'
import ProjectPieChart from '../pies/ProjectPieChart'
import './NroProjectDetails.scss'

const NroProjectDetails = ({ nro, budgetData, budgetTotal, staffData, staffTotal }) => {
  const dataExists = nro && nro.name && budgetData && staffData
  return dataExists ? (
    <div className="nro-project-details">
      <Breadcrumb name={nro.name} />
      <div className="pie-charts">
        <ProjectPieChart title="Budget" data={budgetData} total={budgetTotal} staffUnits={false} isProject="true" />
        <ProjectPieChart title="Staff" data={staffData} total={staffTotal} staffUnits={true} />
      </div>
    </div>
  ) : (
    <NotFound />
  )
}

const mapStateToProps = (state, ownProps) => ({
  nro: lookupNroByKey(state, ownProps.match.params.nro),
  ...getNroProjectDetails(state, ownProps.match.params.nro),
})

export default connect(mapStateToProps)(NroProjectDetails)
