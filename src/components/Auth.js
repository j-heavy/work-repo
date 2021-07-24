import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../redux/action/login.action'

const LoginError = ({ error }) => {
  const visible = error

  return <div>
    <span className={ visible ? "form_text form_text__warning form_text__error" : "form_text form_text__warning form_text__error hide"}>wrond user data</span>
  </div>
}

class Auth extends React.Component {
  state = {
    username: '',
    password: '',
    error: false
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = e => {
    e.preventDefault()
    
    this.fetch(this.state.username, this.state.password) 

    this.setState({ password: '' })
  }

  fetch(username, password) {
    axios({
      method: 'post',
      url: 'http://emphasoft-test-assignment.herokuapp.com/api-token-auth/',
      data: {
        username: username,
        password: password
      }
    }).then(response => {
      console.log(response)
      localStorage.setItem('username', this.state.username)
      this.props.login(true)
    }, error => {
      console.log(error)
      this.setState({ error: true })

      this.props.login(false)
      this.forceUpdate()
    })
  }

  render() {
    const { username, password, error } = this.state
    return (
      <div className="auth_container centered">
        <div className="auth centered">
          <h1 className="header">authorization</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form_container">
              <label className={error ? "form_text form_text__warning" : "form_text"}>username:</label>
              <input 
                className={error ? "form_input form_input__warning" : "form_input"}
                type="username"
                name="username" 
                onChange={this.handleChange}
                value={username}/>
            </div>
            <div className="form_container form_margin">
              <label className={error ? "form_text form_text__warning" : "form_text"}>password:</label>
              <input 
                className={error ? "form_input form_input__warning" : "form_input"}
                name="password"
                type="password" 
                onChange={this.handleChange} 
                value={password}/>
            </div>
            <LoginError error={error}/>
            <div className="button_container">
              <button className="button">
                <span className="button_text">Login</span>
              </button>
            </div>
            <button className="button">
            <span className="button_text"><Link to='/reg'>Registration</Link></span>
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  login: isLogin => dispatch(login(isLogin))
})

export default connect(
  null,
  mapDispatchToProps
)(Auth)