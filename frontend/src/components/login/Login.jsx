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
        {(signup, { loading }) => (
          <div className="login-page">
            <form
              noValidate
              onSubmit={async e => {
                e.preventDefault()
                await signup()
                this.setState({ email: '', password: '' })
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
              <button type="submit">{loading ? 'Signing in...' : 'Sign in'}</button>
            </form>
          </div>
        )}
      </Mutation>
    )
  }

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value })
}

export default Login
