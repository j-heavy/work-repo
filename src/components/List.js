import React from 'react'
import Logout from './Logout'
import axios from 'axios'
import { connect } from 'react-redux'
import { login } from '../redux/action/login.action'

const username = window.localStorage.getItem('username')
let id

const LoginError = ({ error, message }) => {
  let password

  if (message.password) {
    password = '8+ characters, 1 capital, 1 numeric'
  }

  return (
    <span 
      className={ error ? "form_text form_text__warning form_text__error" : "form_text form_text__warning form_text__error hide"}
    >
      { password || message.username || 'wrong user data'}
    </span>
  )
}

class List extends React.Component {
  state = {
    username: username || '',
    password: '',
    firstName: '',
    lastName: '',
    error: false,
    messageError: {
      password: '',
      username: ''
    }
  }

  componentDidMount() {
    this.getID()
  }

  getID() {
    const ctx = this
    let users
  
    var options = {
      method: 'GET',
      url: `http://emphasoft-test-assignment.herokuapp.com/api/v1/users/`,
      headers: {
        'content-type': 'application/json', 
        authorization: 'Token 781bd9f1de084f4daa7ba2aa8a71a2eab855354e'
      }
    }
        
    axios.request(options).then(function (response) {
      console.log(response.data)
      users = response.data
    }).catch(error => {
      console.log(error.response.data)
    }).finally(response => { 

      for (let i = 0; i < users.length; i++) {
        console.log(users[i].username)

        if (users[i].username === username) {
          ctx.setState({ firstName: users[i]['first_name'], lastName: users[i]['last_name'] })
          id = users[i].id
        }
      }
    })
  } 

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = e => {
    e.preventDefault()

    this.fetch(this.state.username, this.firstName, this.lastName, this.state.password) 

    this.setState({ password: '' })
  }

  fetch(username, firstName, lastName, password) {
    const contex = this
    let data

    console.log(`http://emphasoft-test-assignment.herokuapp.com/api/v1/users/${id}/`)
    if (password) {
      data = {
        username: username,
        'first_name': firstName,
        'last_name': lastName,
        password: password
      }
    } else {
      data = {
        username: username,
        'first_name': firstName,
        'last_name': lastName
      }
    }
    
    let options = {
      method: 'PATCH',
      url: `http://emphasoft-test-assignment.herokuapp.com/api/v1/users/${id}/`,
      data: data,
      headers: {
        'content-type': 'application/json', 
        authorization: 'Token 781bd9f1de084f4daa7ba2aa8a71a2eab855354e'
      }
    }
      
    axios.request(options).then(function (response) {
      alert('succesful!')
    }).catch(error => {
      console.log(error.response.data)

      contex.setState({ messageError: error.response.data, error: true })
      contex.forceUpdate()
    })
  }

  render() {
    const { username, firstName, lastName, password, error, messageError } = this.state
    return (
      <div className="auth_container centered">
        <div className="auth centered">
          <Logout />
          <h1 className="header">Edit profile</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form_container">
              <label className="form_text">username:</label>
              <input 
                className="form_input"
                type="username"
                name="username" 
                aria-describedby="emailHelp"
                onChange={this.handleChange}
                value={username}/>
            </div>
            <div className="form_container">
              <label className="form_text">first name:</label>
              <input 
                className="form_input"
                type="firstName"
                name="firstName" 
                aria-describedby="emailHelp"
                onChange={this.handleChange}
                value={firstName}/>
            </div>
            <div className="form_container">
              <label className="form_text">last name:</label>
              <input 
                className="form_input"
                type="lastName"
                name="lastName" 
                aria-describedby="emailHelp"
                onChange={this.handleChange}
                value={lastName}/>
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
            <LoginError error={error} message={messageError} />
            <div className="button_container">
              <button className="button">
                <span className="button_text">Edit</span>
              </button>
            </div>
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
)(List)
