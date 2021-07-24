import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from "react-redux"
import Auth from './Auth'
import List from './List'
import Reg from './Reg'

const App = ({ isLogin }) => {
  return (
    <Switch>
      {isLogin ? (
        <Route path="/" render={() => <List />} />
      ) : (
        <Route exact path="/" render={() => <Auth />} />
      )}
      <Route exact path="/reg" render={() => <Reg />} />
    </Switch>
  )
}

const mapStateToProps = ({ login: { isLogin } }) => ({
  isLogin
})

export default connect(mapStateToProps)(App)