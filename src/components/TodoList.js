import React from 'react'

class TodoList extends React.Component {
  componentWillMount() {
    this.props.actions.getTodos()
  }
  handleEnter(e) {
    if (e.charCode == 13) {
      this.props.actions.addTodo(e.target.value)
    }
    return
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
    const { isAdd, isEdit, text } = this.props.todoList
    const { handleText, handleAdd } = this.props.actions
    return (
      <div className="left-align">
        { isAdd ? null : <a onClick={handleAdd.bind(this)} className="waves-effect waves-light btn">Add</a> }
        <ul>
          { isAdd ?
          <li>
            <input
              placeholder="type here"
              type="text"
              value={text}
              onKeyPress={this.handleEnter.bind(this)}
              onChange={handleText.bind(this)}
            />
          </li>
          : null }
          { this.renderTodos() }
        </ul>
      </div>
    )
  }
}

export default TodoList