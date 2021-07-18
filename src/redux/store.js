import { createStore, applyMiddleware, combineReducers } from "redux";
import { loginReducer } from "./reducer/login.reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddleWare from "redux-saga";
import { rootSaga } from "./rootSaga";

const rootReducer = combineReducers({
  login: loginReducer,
})

const saga = createSagaMiddleWare()
const middleWare = [logger, thunk, saga]
export const store = createStore(rootReducer, applyMiddleware(...middleWare))
saga.run(rootSaga)

store.subscribe(()=>{
  localStorage.setItem('isLogin', JSON.stringify(store.getState().login.isLogin))
})
