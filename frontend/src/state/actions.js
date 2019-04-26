import { client } from '../api/client'
import { loginMutation } from '../api/mutations'

export const setLoggedIn = loggedIn => ({ type: 'SET_LOGGED_IN', loggedIn })

export const setLoginFailed = loginFailed => ({ type: 'SET_LOGIN_FAILED', loginFailed })

export const setLoading = loading => ({ type: 'SET_LOADING', loading })

export const requestLogin = (email, password) => async dispatch => {
  dispatch(setLoading(true))
  dispatch(setLoginFailed(false))
  const response = await client.mutate({ mutation: loginMutation, variables: { email, password } })
  if (response.data && response.data.login && response.data.login.token) {
    localStorage.setItem('accessToken', response.data.login.token)
    dispatch(setLoggedIn(true))
  } else {
    dispatch(setLoginFailed(true))
  }
  dispatch(setLoading(false))
}

export const requestLogout = () => dispatch => {
  localStorage.setItem('accessToken', null)
  dispatch(setLoggedIn(false))
}
