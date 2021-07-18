import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import validator from 'validator';
import { login } from "../../redux/action/login.action"

const LoginError = ({ wrongLogin, wrongPassword, wrongPasswordLanguage, wrongPasswordLength }) => {
  const visible = wrongLogin || wrongPassword
  let messageError, hiddenStatus
  let styles = {
    visibility: hiddenStatus
  }

  if (visible) {
    hiddenStatus = 'hidden'
  } else {
    hiddenStatus = 'visible'
  }

  if (wrongLogin) {
    messageError = 'Неправильный логин'
  } else if (wrongPasswordLanguage) {
    messageError = 'Кириллицу использовать нельзя'
  } else if (wrongPasswordLength) {
    messageError = 'Короткий пароль'
  } else {
    messageError = 's'
  }

  return <div>
    <span className={ visible ? "form_text form_text__warning form_text__error" : "form_text form_text__warning form_text__error hide"}>{messageError}</span>
  </div>
}

class Auth extends React.Component {
  state = {
    login: "",
    password: "",
    wrongLogin: false,
    wrongPassword: false,
    wrongPasswordLength: false,
    wrongPasswordLanguage: false
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = e => {
    e.preventDefault()

    this.validate(this.state.login, this.state.password) 
      ? this.props.login(true) 
      : this.props.login(false)

    this.setState({ login: "", password: "" })
  }

  validate(login, password) {
    if (this.validateLogin(login) && this.validatePassword(password)) {
      return true
    } else {
      return false
    }
  }

  validateLogin(login) {
    if(validator.isEmail(login)) {
      this.setState({wrongLogin: false})
      return true
    } else {
      this.setState({wrongLogin: true})
      return false
    }
  }

  validatePassword(password) {
    if(!/[а-яА-ЯЁё]/.test(password) && password.length > 7) {
      this.setState({wrongPassword: false, wrongPasswordLength: false, wrongPasswordLanguage: false})

      return true
    } else if (password.length < 8) {
      this.setState({wrongPassword: true, wrongPasswordLength: true, wrongPasswordLanguage: false})
      return false
    } else {
      this.setState({wrongPasswordLanguage: true})
      return false
    }
  }

  render() {
    const { login, password, wrongLogin, wrongPassword, wrongPasswordLanguage, wrongPasswordLength } = this.state
    return (
      <div className="auth_container centered">
        <div className="auth centered">
          <h1 className="header">Simple Flight Check</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form_container">
              <label className={wrongLogin ? "form_text form_text__warning" : "form_text"}>Логин:</label>
              <input 
                className={wrongLogin ? "form_input form_input__warning" : "form_input"}
                type="login"
                name="login" 
                aria-describedby="emailHelp"
                onChange={this.handleChange}
                value={login}/>
            </div>
            <div className="form_container form_margin">
              <label className={wrongPassword ? "form_text form_text__warning" : "form_text"}>Пароль:</label>
              <input 
                className={wrongPassword ? "form_input form_input__warning" : "form_input"}
                name="password"
                type="password" 
                onChange={this.handleChange} 
                value={password}/>
            </div>
            <LoginError 
              wrongPassword={wrongPassword}
              wrongLogin={wrongLogin}
              wrongPasswordLength={wrongPasswordLength}
              wrongPasswordLanguage={wrongPasswordLanguage}
            />
            <div className="button_container">
              <button className="button_authorize">
                <span className="button_text">Войти</span>
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
)(Auth)