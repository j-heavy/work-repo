import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom"
import { store } from "./redux/store";
import App from './components/App'

import 'sanitize.css/sanitize.css'
import './index.css'

const target = document.querySelector('.root')
global.state = store

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />  
    </BrowserRouter>
  </Provider>,
  target
)
