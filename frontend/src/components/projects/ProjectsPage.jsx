import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { fetchProjectData } from '../../state/actions'
import nroProject from './nroProject'

class ProjectsPage extends React.Component {
  componentDidMount() {
    this.props.loadData()
  }

  render() {
    const { loadingData, dataExists } = this.props

    return loadingData || !dataExists ? null : (
      <Switch>
        <Route path="/projects/nros/:nro" exact component={nroProject} />
        <Route path="/projects/priorities/:project" exact render={() => <div style={{ flexGrow: 1 }} />} />
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  loadingData: state.loadingData,
  dataExists: state.nroProjectData.length > 0,
})

const mapDispatchToProps = dispatch => ({
  loadData: () => {
    dispatch(fetchProjectData())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsPage)
