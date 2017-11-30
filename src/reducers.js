import { combineReducers } from 'redux';
import { todoListReducer } from './modules/todolist';

const rootReducer = combineReducers({
  todoList: todoListReducer,
});

export default rootReducer;