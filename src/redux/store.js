import { createStore, applyMiddleware, combineReducers } from "redux";
import { loginReducer } from "./reducer/login.reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddleWare from "redux-saga";

const rootReducer = combineReducers({
  login: loginReducer,
})

const saga = createSagaMiddleWare()
const middleWare = [logger, thunk, saga]
export const store = createStore(rootReducer, applyMiddleware(...middleWare))

store.subscribe(()=>{
  localStorage.setItem('isLogin', JSON.stringify(store.getState().login.isLogin))
})
