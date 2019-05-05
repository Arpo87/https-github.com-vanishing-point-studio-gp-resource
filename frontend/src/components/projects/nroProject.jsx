import React from 'react'
import { connect } from 'react-redux'
import { getSelectedProjectData } from '../../state/selectors'
import './nroProject.scss'

class nroProject extends React.Component {
  getNroName = () => {
    return this.props.selectedProjectData[0].nro.name
  }

  render() {
    const { selectedProjectData } = this.props
    console.log(this.props.selectedProjectData)
    return (
      <div className="nro-project-wrap" style={{ flexGrow: 1 }}>
        <div className="main-scroll custom-scrollbar">
          <div className="page-content">
            <h1>
              <a href="/projects">Projects</a> <span className="separator">></span>
              {this.getNroName()}
            </h1>
            <div className="charts-wrap">
              <div className="nro-chart budget">BUDGET CHART</div>

              <div className="nro-chart budget">STAFF CHART</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  loadingData: state.loadingData,
  selectedProjectData: getSelectedProjectData(state, ownProps.match.params.nro),
})

export default connect(mapStateToProps)(nroProject)
