const reducer = (state = createInitialState(), action) => {
  switch (action.type) {
    case 'INITIALIZED':
      return { ...state, initializing: false }
    case 'SET_LOGGED_IN':
      return { ...state, loggedIn: action.loggedIn }
    case 'SET_LOGIN_FAILED':
      return { ...state, loginFailed: action.loginFailed }
    case 'SET_LOGGING_IN':
      return { ...state, loggingIn: action.loggingIn }
    case 'SET_LOADING_DATA':
      return { ...state, loadingData: action.loadingData }
    case 'SET_DATA':
      return { ...state, data: action.data }
    default:
      return state
  }
}

const createInitialState = () => ({
  initializing: true,
  loggedIn: false,
  loginFailed: false,
  loggingIn: false,
  loadingData: false,
  data: [],
})

export default reducer
