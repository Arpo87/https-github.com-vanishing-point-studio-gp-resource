import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { onLoad } from '../../state/actions'
import Frame from '../frame/Frame'
import Login from '../login/Login'

class Root extends React.Component {
  componentDidMount() {
    this.props.onLoad()
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/" component={Frame} />
        </Switch>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => ({ onLoad: () => dispatch(onLoad()) })

export default connect(
  null,
  mapDispatchToProps
)(Root)
