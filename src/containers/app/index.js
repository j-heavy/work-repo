import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import Auth from '../auth'
import About from '../about'
import { connect } from "react-redux"

const App = ({ isLogin }) => {
  return (
    <Switch>
      {isLogin ? (
        <Route path="/" render={() => <About />} />
      ) : (
        <Route exact path="/" render={() => <Auth />} />
      )}
    </Switch>
  )
}

const mapStateToProps = ({ login: { isLogin } }) => ({
  isLogin
})

export default connect(mapStateToProps)(App)
