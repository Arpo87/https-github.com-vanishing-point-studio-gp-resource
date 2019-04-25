import React from 'react'
import './Login.scss'

class Login extends React.Component {
  state = { email: '', password: '' }

  render() {
    return (
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
          <button type="submit">Sign in</button>
        </form>
      </div>
    )
  }

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = e => {
    e.preventDefault()
  }
}

export default Login
