import React from 'react'

class TodoList extends React.Component {
  componentWillMount() {
    this.props.actions.getTodos()
  }
  renderTodos() {
    const { todoList, actions } = this.props
    let rendered = new Array()
    todoList.todos.map(todo => {
      rendered.push(
        <li key={todo.id}>
          <input type="checkbox" id={todo.id} onChange={actions.toggleTodo.bind(this, todo)} checked={todo.completed}/>
          <label htmlFor={todo.id}>{todo.text}</label>
        </li>
      )
    })
    return rendered
  }
  render() {
    return (
      <div className="left-align">
        <ul>
          { this.renderTodos() }
        </ul>
      </div>
    )
  }
}

export default TodoList