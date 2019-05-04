import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { fetchProjectData, fetchNroData } from '../../state/actions'
import { getProjectGroups } from '../../state/selectors'
import './projectsOverview.scss'

class projectsOverview extends React.Component {
  componentDidMount() {
    this.props.loadData()
  }

  render() {
    const { loadingData, projectGroups, nroData } = this.props
    return (
      <div className="projects-wrap" style={{ flexGrow: 1 }}>
        <div className="main-scroll custom-scrollbar">
          {loadingData ? null : (
            <div className="page-content">
              <h1>Projects</h1>
              <div className="list-wrap">
                <div className="nros-list">
                  <h3>
                    By <span>NRO</span>
                  </h3>
                  <ul>
                    {nroData &&
                      nroData.map((nro, i) => {
                        const name = nro.name
                        const safeName = nro.name.replace(/ /g, '-').toLowerCase()

                        return (
                          <li key={i}>
                            <Link to={`projects/nros/${safeName}`}>{name}</Link>
                          </li>
                        )
                      })}
                  </ul>
                </div>

                <div className="projects-list">
                  <h3>
                    By <span>Projects</span>
                  </h3>
                  <ul>
                    {projectGroups &&
                      projectGroups.map((projectGroup, i) => {
                        const name = projectGroup
                        const safeName = projectGroup.replace(/ /g, '-').toLowerCase()

                        return (
                          <li key={i}>
                            <Link to={`projects/priorities/${safeName}`}>{name}</Link>
                          </li>
                        )
                      })}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loadingData: state.loadingData,
  nroProjectData: state.nroProjectData,
  nroData: state.nroData,
  projectGroups: getProjectGroups(state),
})

const mapDispatchToProps = dispatch => ({
  loadData: () => {
    dispatch(fetchProjectData())
    dispatch(fetchNroData())
  },
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(projectsOverview)
)
