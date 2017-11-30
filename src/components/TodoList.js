import React from 'react'

class TodoList extends React.Component {
  componentWillMount() {
    this.props.actions.getTodos()
  }
  handleEnter(e) {
    const { isEdit } = this.props.todoList
    if (e.charCode == 13) {
      isEdit ? this.props.actions.editTodo(e.target.value) : this.props.actions.addTodo(e.target.value)      
    }
    return
  }
  renderTodos() {
    const { todoList, actions } = this.props
    const { isEdit, todos } = this.props.todoList
    let rendered = new Array()
    todos.map(todo => {
      rendered.push(
        <li key={todo.id} style={{ marginBottom: 15 }}>
          { isEdit ?
          <div className="row">
            <a
              style={{ marginRight: 15 }}
              className="waves-effect waves-light btn red col s2"
              onClick={actions.deleteTodo.bind(this, todo.id)}>
              <i className="material-icons">delete</i>
            </a>
            <input
              type="text"
              value={todo.text}
              onKeyPress={this.handleEnter.bind(this)}
              onBlur={actions.editTodo.bind(this, todo)}
              onChange={actions.handleTextEdit.bind(this, todo)}
              className="col s9"
            />
          </div>
          : <div><input type="checkbox" id={todo.id} onChange={actions.toggleTodo.bind(this, todo)} checked={todo.completed}/>
          <label htmlFor={todo.id}>{todo.text}</label></div>
          }
        </li>
      )
    })
    return rendered
  }
  render() {
    const { isAdd, isEdit, text } = this.props.todoList
    const { handleTextAdd, handleAdd, handleEdit, logout } = this.props.actions
    return (
      <div className="left-align">
        { !isAdd ?
          <a onClick={handleAdd.bind(this)} className="waves-effect waves-light btn">Add</a>
        : <a onClick={handleAdd.bind(this)} className="waves-effect waves-light btn">Cancel</a> }
        { !isEdit ?
          <a onClick={handleEdit.bind(this)} className="waves-effect waves-light btn">Edit</a>
        : <a onClick={handleEdit.bind(this)} className="waves-effect waves-light btn">Done</a> }
        <a onClick={logout.bind(this)} className="waves-effect waves-light btn">Logout</a>
        <ul>
          { isAdd ?
          <li>
            <input
              placeholder="type here"
              type="text"
              value={text}
              onKeyPress={this.handleEnter.bind(this)}
              onChange={handleTextAdd.bind(this)}
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