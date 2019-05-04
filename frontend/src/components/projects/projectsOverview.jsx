import React from 'react'
import { connect } from 'react-redux'
import { fetchProjectData, fetchData } from '../../state/actions'
import './projectsOverview.scss'

class projectsOverview extends React.Component {
  componentDidMount() {
    this.props.loadData()
  }

  render() {
    const { loadingData } = this.props
    console.log(this.props.data)
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
                    <li>
                      <a href="projects/nros/name">NRO Name</a>
                    </li>
                  </ul>
                </div>

                <div className="projects-list">
                  <h3>
                    By <span>Projects</span>
                  </h3>
                  <ul>
                    <li>
                      <a href="link/to/project">Project Name</a>
                    </li>
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
})

const mapDispatchToProps = dispatch => ({
  loadData: () => {
    dispatch(fetchProjectData())
    dispatch(fetchData())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(projectsOverview)
