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
export const TOGGLE_TODO = 'TOGGLE_TODO'

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
export function toggleTodo(todo) {
  return (dispatch, getState) => {
    let bodyData = {
      text: todo.text,
      completed: !todo.completed
    }
    axios.put(`http://localhost:3000/todos/${todo.id}`, bodyData, {"Content-Type":"application/json"})
    .then(res => {
      dispatch({
        type    : TOGGLE_TODO,
        payload : res.data.id
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
  [GET_TODOS]     : (state, action) => ({...state, todos: action.payload}),  
  [TOGGLE_TODO]           : (state, action) => ({...state,
    todos: state.todos.map(todo => (todo.id === action.payload) ? {...todo, completed: !todo.completed} : todo)
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
export function todoListReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}