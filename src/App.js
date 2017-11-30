import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import * as actions from './modules/todolist'
import actions from './action.js'
import Layout from './layouts/Layout'
import Login from './components/Login'
import TodoList from './components/TodoList'

class App extends React.Component {
  render() {
    const { todoList, login, actions } = this.props;
    return (
      <div>
        { login ?
          <TodoList todoList={todoList} actions={actions}/>
          : <Login actions={actions}/>
        }
      </div>
    );
  }
}

App.propTypes = {
  todoList: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    todoList: state.todoList,
    login: state.login
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
// const mapDispatchToProps = {  
//     ...actions
// }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout(App));