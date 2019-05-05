import React from 'react'
import { connect } from 'react-redux'
import { lookupNroByKey, getNroProjectDetails } from '../../state/selectors'
import NotFound from '../frame/NotFound'
import Breadcrumb from './Breadcrumb'
import './NroProjectDetails.scss'
import LabelledPieChart from '../pies/LabelledPieChart'

const NroProjectDetails = ({ nro, projectDetails }) => {
  const dataExists = nro && nro.name && projectDetails
  return dataExists ? (
    <div className="nro-project-details">
      <Breadcrumb name={nro.name} />
      <div className="pie-charts">
        <LabelledPieChart title="Budget" data={[]} total={0} staffUnits={false} />
        <LabelledPieChart title="Staff" data={[]} total={0} staffUnits={true} />
      </div>
    </div>
  ) : (
    <NotFound />
  )
}

const mapStateToProps = (state, ownProps) => ({
  nro: lookupNroByKey(state, ownProps.match.params.nro),
  projectDetails: getNroProjectDetails(state, ownProps.match.params.nro),
})

export default connect(mapStateToProps)(NroProjectDetails)
