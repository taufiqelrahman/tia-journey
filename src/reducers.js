import { combineReducers } from 'redux';
import { todoListReducer } from './modules/todolist';
import { loginReducer } from './modules/login';

const rootReducer = combineReducers({
  todoList: todoListReducer,
  login: loginReducer
});

export default rootReducer;