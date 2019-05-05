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
    case 'SET_LOADING_NRO_DATA':
      return { ...state, loadingNroData: action.loadingNroData }
    case 'SET_NRO_DATA':
      return { ...state, nroData: action.nroData }
    case 'SET_LOADING_PROJECT_DATA':
      return { ...state, loadingProjectData: action.loadingProjectData }
    case 'SET_PROJECT_DATA':
      return { ...state, projectData: action.projectData }
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
  projectData: [],
})

export default reducer
