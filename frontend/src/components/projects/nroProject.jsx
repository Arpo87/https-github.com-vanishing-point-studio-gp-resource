import React from 'react'
import { connect } from 'react-redux'
import { getProjectsForNro } from '../../state/selectors'
import './NroProject.scss'

const NroProject = ({ myProjects }) => <div className="nro-project">{myProjects.map(p => p.name)}</div>

const mapStateToProps = (state, ownProps) => ({
  myProjects: getProjectsForNro(state, ownProps.match.params.nro),
})

export default connect(mapStateToProps)(NroProject)
