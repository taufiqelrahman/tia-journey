import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './modules/todolist'
import TodoList from './components/TodoList'

class App extends React.Component {
  render() {
    const { todoList, actions } = this.props;
    return (
      <div>
        <TodoList todoList={todoList} actions={actions}/>
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
    todoList: state.todoList
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
)(App);