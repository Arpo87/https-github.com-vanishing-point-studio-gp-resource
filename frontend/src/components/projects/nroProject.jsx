import React from 'react'
import { connect } from 'react-redux'
import { fetchProjectData } from '../../state/actions'
import './nroProject.scss'

class nroProject extends React.Component {

  componentDidMount() {
    this.props.loadData()
  }

  render() {
    const { loadingData } = this.props
    return (
      <div className='nro-project-wrap' style={{ flexGrow: 1 }} >
        <div className="main-scroll custom-scrollbar">
          {loadingData ? null : (
            <div className="page-content">
              <h1><a href="/projects">Projects</a> <span className="separator">></span> NRO NAME</h1>
              <div className="charts-wrap">
                <div className="nro-chart budget">
                  BUDGET CHART
                </div>

                <div className="nro-chart budget">
                  STAFF CHART
                </div>
              </div>

            </div>
          )}
        </div>
        
      </div>
    )
  }


}

const mapStateToProps = state => ({ loadingData: state.loadingData })

const mapDispatchToProps = dispatch => ({ loadData: () => dispatch(fetchProjectData()) })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(nroProject)
