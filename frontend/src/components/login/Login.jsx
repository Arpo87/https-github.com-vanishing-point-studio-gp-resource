import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { requestLogin } from '../../state/actions'
import './Login.scss'

class Login extends React.Component {
  state = { email: '', password: '' }

  render() {
    const { loggedIn, loginFailed, loggingIn } = this.props
    return loggedIn ? (
      <Redirect to="/" />
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
          <button className="form" type="submit">
            {loggingIn ? 'Signing in...' : 'Sign in'}
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
