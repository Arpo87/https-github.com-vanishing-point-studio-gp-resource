import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { requestLogin } from '../../state/actions'
import Spinner from '../widgets/Spinner'
import './Login.scss'

class Login extends React.Component {
  state = { email: '', password: '' }

  render() {
    const { loggedIn, loginFailed, loggingIn, location } = this.props
    return loggedIn ? (
      <Redirect to={(location.state && location.state.from) || '/'} />
    ) : (
      <div className="login-page">
        <form noValidate onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            spellCheck={false}
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            spellCheck={false}
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <button className="form" type="submit" disabled={loggingIn}>
            {loggingIn ? (
              <React.Fragment>
                <Spinner />
                <span>Signing in...</span>
              </React.Fragment>
            ) : (
              'Sign in'
            )}
          </button>
          {loginFailed && <div className="error">Invalid email or password!</div>}
        </form>
      </div>
    )
  }

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = e => {
    e.preventDefault()
    this.props.requestLogin(this.state.email, this.state.password)
  }
}

const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({ requestLogin: (email, password) => dispatch(requestLogin(email, password)) })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
