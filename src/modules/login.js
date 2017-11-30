// ------------------------------------
// Initial State
// ------------------------------------
// const initialState = localStorage.getItem('Todos') ? JSON.parse(localStorage.getItem('Todos')) : []
const initialState = localStorage.getItem('login') ? localStorage.getItem('login') : false

// ------------------------------------
// Constants Actions
// ------------------------------------
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const RESET_MODES = 'RESET_MODES'

// ------------------------------------
// Actions
// ------------------------------------
export function login() {  
  return (dispatch, getState) => {
    localStorage.setItem('login', true)
    dispatch({
      type    : LOGIN,
      payload : true
    })
  }
}
export function logout() {  
  return (dispatch, getState) => {
    localStorage.removeItem('login')
    dispatch({
      type    : LOGOUT,
      payload : false
    })
    dispatch({
      type    : RESET_MODES
    })
  }
}

// ------------------------------------
// Action Handlers of Reducer
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN] : (state, action) => (action.payload),  
  [LOGOUT] : (state, action) => (action.payload),
}

// ------------------------------------
// Reducer
// ------------------------------------
export function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}