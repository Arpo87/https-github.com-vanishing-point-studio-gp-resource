const reducer = (state = createInitialState(), action) => {
  switch (action.type) {
    case 'INITIALIZED':
      return { ...state, initializing: false }
    case 'SET_ADMIN':
      return { ...state, admin: action.admin }
    case 'SET_LOGGED_IN':
      return { ...state, loggedIn: action.loggedIn }
    case 'SET_LOGIN_FAILED':
      return { ...state, loginFailed: action.loginFailed }
    case 'SET_LOGGING_IN':
      return { ...state, loggingIn: action.loggingIn }
    case 'SET_LOADING_DATA':
      return { ...state, loadingData: action.loadingData }
    case 'SET_NRO_DATA':
      return { ...state, nroData: action.nroData }
    case 'SET_PROJECT_DATA':
      return { ...state, nroProjectData: action.nroProjectData }
    default:
      return state
  }
}

const createInitialState = () => ({
  initializing: true,
  admin: false,
  loggedIn: false,
  loginFailed: false,
  loggingIn: false,
  loadingData: false,
  nroData: [],
  nroProjectData: [],
})

export default reducer
