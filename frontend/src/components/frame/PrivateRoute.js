import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, loggedIn, initializing, ...rest }) => (
  <Route
    render={props =>
      loggedIn ? (
        <Component {...props} />
      ) : initializing ? null : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
    {...rest}
  />
)

const mapStateToProps = state => ({ loggedIn: state.loggedIn, initializing: state.initializing })

export default connect(mapStateToProps)(PrivateRoute)
