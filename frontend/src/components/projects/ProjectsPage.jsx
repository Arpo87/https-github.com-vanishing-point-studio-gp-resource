import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { fetchNroData, fetchProjectData } from '../../state/actions'
import ProjectsOverview from './ProjectsOverview'
import NroProject from './NroProject'
import NotFound from '../frame/NotFound'
import Spinner from '../widgets/Spinner'
import './ProjectsPage.scss'

class ProjectsPage extends React.Component {
  componentDidMount() {
    this.props.loadData()
  }

  render() {
    const { loadingData, dataExists } = this.props
    return (
      <div className="projects-page">
        <div className="main-scroll custom-scrollbar">
          {loadingData || !dataExists ? (
            <Spinner />
          ) : (
            <Switch>
              <Route path="/projects" exact component={ProjectsOverview} />
              <Route path="/projects/nros/:nro" exact component={NroProject} />
              <Route path="/projects/priorities/:project" exact render={() => <div style={{ flexGrow: 1 }} />} />
              <Route path="/" component={NotFound} />
            </Switch>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loadingData: state.loadingNroData || state.loadingProjectData,
  dataExists: state.nroData.length > 0 && state.projectData.length > 0,
})

const mapDispatchToProps = dispatch => ({
  loadData: () => {
    dispatch(fetchNroData())
    dispatch(fetchProjectData())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsPage)
