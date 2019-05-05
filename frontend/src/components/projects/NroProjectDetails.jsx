import React from 'react'
import { connect } from 'react-redux'
import { lookupNroByKey, getProjectsForNro } from '../../state/selectors'
import NotFound from '../frame/NotFound'
import Breadcrumb from './Breadcrumb'
import './NroProjectDetails.scss'

const NroProjectDetails = ({ nro, myProjects }) => {
  const dataExists = nro && nro.name && myProjects && myProjects.length > 0
  return dataExists ? (
    <div className="nro-project-details">
      <Breadcrumb name={nro.name} />
    </div>
  ) : (
    <NotFound />
  )
}

const mapStateToProps = (state, ownProps) => ({
  nro: lookupNroByKey(state, ownProps.match.params.nro),
  myProjects: getProjectsForNro(state, ownProps.match.params.nro),
})

export default connect(mapStateToProps)(NroProjectDetails)
