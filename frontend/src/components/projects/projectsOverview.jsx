import React from 'react'
import { connect } from 'react-redux'
import { fetchProjectData } from '../../state/actions'
import './projectsOverview.scss'

class projectsOverview extends React.Component {

  componentDidMount() {
    this.props.loadData()
  }

  render() {
    const { loadingData } = this.props
    return (
      <div className='projects-wrap' style={{ flexGrow: 1 }} >
        <div className="main-scroll custom-scrollbar">
          {loadingData ? null : (
            <div className="page-content">
              Projects
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
)(projectsOverview)
