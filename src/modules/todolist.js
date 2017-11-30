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
export const EDIT_TODO = 'EDIT_TODO'
export const DELETE_TODO = 'DELETE_TODO'

export const HANDLE_TEXT_ADD = 'HANDLE_TEXT_ADD'
export const HANDLE_TEXT_EDIT = 'HANDLE_TEXT_EDIT'
export const HANDLE_ADD = 'HANDLE_ADD'
export const HANDLE_EDIT = 'HANDLE_EDIT'
export const RESET_MODES = 'RESET_MODES'

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
export function editTodo(todo) {
  return (dispatch, getState) => {
    let bodyData = {
      text: todo.text,
      completed: todo.completed
    }
    axios.put(`http://localhost:3000/todos/${todo.id}`, bodyData, {"Content-Type":"application/json"})
    .then(res => {
      dispatch({
        type    : EDIT_TODO,
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
export function deleteTodo(id) {
  return (dispatch, getState) => {
    axios.delete(`http://localhost:3000/todos/${id}`)
    .then(res => {
      dispatch({
        type    : DELETE_TODO,
        payload : id
      })
    })
    .catch(err => {
      dispatch({
        type    : API_FAILED
      })
    })
  }
}

export function handleTextAdd(e) {
  return {
    type    : HANDLE_TEXT_ADD,
    payload : e.target.value
  }
}
export function handleTextEdit(todo, e) {
  return {
    type    : EDIT_TODO,
    payload : { id: todo.id, text: e.target.value }
  }
}
export function handleAdd() {
  return {
    type    : HANDLE_ADD
  }
}
export function handleEdit() {
  return {
    type    : HANDLE_EDIT
  }
}

// ------------------------------------
// Action Handlers of Reducer
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_TODOS]           : (state, action) => ({...state, todos: action.payload}), 
  [ADD_TODO]            : (state, action) => ({...state, 
    todos: [...state.todos, { id: action.payload.id, text: action.payload.text, completed: false }],
    text: '',
    isAdd: !state.isAdd
  }), 
  [TOGGLE_TODO]         : (state, action) => ({...state,
    todos: state.todos.map(todo => (todo.id === action.payload) ? {...todo, completed: !todo.completed} : todo)
  }),
  [EDIT_TODO]           : (state, action) => ({...state,
    todos: state.todos.map(todo => (todo.id === action.payload.id) ? {...todo, text: action.payload.text} : todo)
  }),
  [DELETE_TODO]         : (state, action) => ({...state,
    todos: [...state.todos.slice(0, state.todos.findIndex(todo => todo.id === action.payload)),
    ...state.todos.slice(state.todos.findIndex(todo => todo.id === action.payload) + 1)]
  }),
  [HANDLE_TEXT_ADD]     : (state, action) => ({...state, text: action.payload}),
  [HANDLE_ADD]          : (state, action) => ({...state, isAdd: !state.isAdd, text: ''}),
  [HANDLE_EDIT]         : (state, action) => ({...state, isEdit: !state.isEdit}),
  [RESET_MODES]         : (state, action) => ({...state, isEdit: false, isAdd: false})
}

// ------------------------------------
// Reducer
// ------------------------------------
export function todoListReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}