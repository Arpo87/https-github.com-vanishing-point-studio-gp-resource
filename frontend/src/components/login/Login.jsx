import React from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import './Login.scss'

const loginMutation = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

class Login extends React.Component {
  state = { email: '', password: '' }

  render() {
    return (
      <Mutation mutation={loginMutation} variables={this.state}>
        {(requestLogin, { loading, error }) => (
          <div className="login-page">
            <form
              noValidate
              onSubmit={async e => {
                e.preventDefault()
                try {
                  const response = await requestLogin()
                  const token = response.data.login.token
                  localStorage.setItem('accessToken', token)
                  this.setState({ email: '', password: '' })
                } catch (e) {}
              }}
            >
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
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
              {error && <div className="error">Invalid email or password!</div>}
            </form>
          </div>
        )}
      </Mutation>
    )
  }

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value })
}

export default Login
