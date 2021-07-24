import React from 'react'
import { withRouter } from "react-router"
import { connect } from "react-redux"
import { login } from "../redux/action/login.action"
import logoutIcon from './../assets/logout.png'

const Logout = ({ history, login }) => {
  return (
    <div className="logout" onClick={() => {
        login(false)
        window.localStorage.clear()
        history.push("/")
      }}
    >
      <div className="logout_container">
        <span className="logout_text">Log out</span>
        <img src={logoutIcon} alt="" className="logout_icon"/>
      </div>
    </div>
  )
}

const mapDispatchToprops = dispatch => ({
  login: isLogin => dispatch(login(isLogin))
})

export default connect(
  null,
  mapDispatchToprops
)(withRouter(Logout))