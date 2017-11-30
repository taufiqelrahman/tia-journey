import uuidv1 from 'uuid/v1'
import axios from 'axios'

// ------------------------------------
// Initial State
// ------------------------------------
// const initialState = localStorage.getItem('Todos') ? JSON.parse(localStorage.getItem('Todos')) : []
const initialState = {
  isAdd: false,
  isEdit: false,
  text: '',
  todos: []
}

// ------------------------------------
// Constants Actions
// ------------------------------------
export const GET_TODOS = 'GET_TODOS'
export const API_FAILED = 'API_FAILED'

// ------------------------------------
// Actions
// ------------------------------------
export function getTodos() {
  return (dispatch, getState) => {
    axios.get(`http://localhost:3000/todos`)
    .then(res => {
      dispatch({
        type    : GET_TODOS,
        payload : res.data
      })
    })
    .catch(err => {
      dispatch({
        type    : API_FAILED
      })
    })
  }
}
export const actions = {
  getTodos
}

// ------------------------------------
// Action Handlers of Reducer
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_TODOS]     : (state, action) => ({...state, todos: action.payload})
}

// ------------------------------------
// Reducer
// ------------------------------------
export function todoListReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}