const reducer = (state = createInitialState(), action) => {
  switch (action.type) {
    case 'SET_LOGGED_IN':
      return { ...state, loggedIn: action.loggedIn }
    case 'SET_LOGIN_FAILED':
      return { ...state, loginFailed: action.loginFailed }
    case 'SET_LOADING':
      return { ...state, loading: action.loading }
    default:
      return state
  }
}

const createInitialState = () => ({
  loggedIn: false,
  loginFailed: false,
  loading: false,
})

export default reducer
