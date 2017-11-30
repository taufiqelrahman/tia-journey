import React from 'react'

class Login extends React.Component {
  render() {
    const { actions } = this.props
    return (
      <button
        className="waves-effect waves-light btn"
        onClick={actions.login.bind(this)}
      >
        login
      </button>
    )
  }
}

export default Login