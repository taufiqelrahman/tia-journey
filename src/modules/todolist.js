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
export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'

export const HANDLE_TEXT = 'HANDLE_TEXT'
export const HANDLE_ADD = 'HANDLE_ADD'

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
export function addTodo(todo) {
  return (dispatch, getState) => {
    let bodyData = {
      text: todo,
      completed: false
    }
    axios.post(`http://localhost:3000/todos`, bodyData, {"Content-Type":"application/json"})
    .then(res => {
      dispatch({
        type    : ADD_TODO,
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
export function handleText(e) {
  return {
    type    : HANDLE_TEXT,
    payload : e.target.value
  }
}
export function handleAdd() {
  return {
    type    : HANDLE_ADD
  }
}

// ------------------------------------
// Action Handlers of Reducer
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_TODOS]             : (state, action) => ({...state, todos: action.payload}), 
  [ADD_TODO]              : (state, action) => ({...state, 
    todos: [...state.todos, { id: action.payload.id, text: action.payload.text, completed: false }],
    text: '',
    isAdd: !state.isAdd
  }), 
  [TOGGLE_TODO]           : (state, action) => ({...state,
    todos: state.todos.map(todo => (todo.id === action.payload) ? {...todo, completed: !todo.completed} : todo)
  }),
  [HANDLE_TEXT]           : (state, action) => ({...state, text: action.payload}),
  [HANDLE_ADD]            : (state, action) => ({...state, isAdd: !state.isAdd})
}

// ------------------------------------
// Reducer
// ------------------------------------
export function todoListReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}