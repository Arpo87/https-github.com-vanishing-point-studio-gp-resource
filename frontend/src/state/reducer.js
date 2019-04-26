const reducer = (state = createInitialState(), action) => {
  switch (action.type) {
    case 'SET_LOGGED_IN':
      return { ...state, loggedIn: action.loggedIn }
    case 'SET_LOGIN_FAILED':
      return { ...state, loginFailed: action.loginFailed }
    case 'SET_LOGGING_IN':
      return { ...state, loggingIn: action.loggingIn }
    default:
      return state
  }
}

const createInitialState = () => ({
  loggedIn: false,
  loginFailed: false,
  loggingIn: false,
})

export default reducer
