import { client } from '../api/client'
import { loginMutation } from '../api/mutations'
import { meQuery, nroQuery } from '../api/queries'

export const initialized = () => ({ type: 'INITIALIZED' })

export const setLoggedIn = loggedIn => ({ type: 'SET_LOGGED_IN', loggedIn })

export const setLoginFailed = loginFailed => ({ type: 'SET_LOGIN_FAILED', loginFailed })

export const setLoggingIn = loggingIn => ({ type: 'SET_LOGGING_IN', loggingIn })

export const requestLogin = (email, password) => async dispatch => {
  dispatch(setLoggingIn(true))
  dispatch(setLoginFailed(false))
  try {
    const response = await client.mutate({ mutation: loginMutation, variables: { email, password } })
    if (response.data && response.data.login && response.data.login.token) {
      localStorage.setItem('accessToken', response.data.login.token)
      dispatch(setLoggedIn(true))
    } else {
      dispatch(setLoginFailed(true))
    }
  } catch (e) {
    dispatch(setLoginFailed(true))
  }
  dispatch(setLoggingIn(false))
}

export const requestLogout = () => dispatch => {
  localStorage.setItem('accessToken', null)
  dispatch(setLoggedIn(false))
}

export const setAdmin = admin => ({ type: 'SET_ADMIN', admin })

export const onLoad = () => async dispatch => {
  if (localStorage.getItem('accessToken')) {
    // If they have an accessToken, assume it is valid so they will see the logged-in area right away. If the
    // token exists but is expired they will see the logged-in area briefly before being redirected to login.
    dispatch(setLoggedIn(true))
    dispatch(initialized())
    try {
      const response = await client.query({ query: meQuery })
      if (response && response.data) {
        if (response.data.isAdmin) {
          dispatch(setAdmin(true))
        }
      } else {
        dispatch(setLoggedIn(false))
      }
    } catch (e) {
      dispatch(setLoggedIn(false))
    }
  } else {
    dispatch(initialized())
  }
}

export const setLoadingData = loadingData => ({ type: 'SET_LOADING_DATA', loadingData })

export const setData = data => ({ type: 'SET_DATA', data })

export const fetchNros = () => async dispatch => {
  dispatch(setData([]))
  dispatch(setLoadingData(true))
  try {
    const response = await client.query({ query: nroQuery })
    if (response && response.data && response.data.nros) {
      dispatch(setData(response.data.nros))
    }
  } catch (e) {}
  dispatch(setLoadingData(false))
}
