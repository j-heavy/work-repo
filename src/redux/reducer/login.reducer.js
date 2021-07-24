const isLogin = window.localStorage.getItem('isLogin') 

const init = {
  isLogin: (isLogin === 'true' || isLogin === true) ? true : false
};

export const loginReducer = (state = init, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLogin: action.payload }
    default:
      return state
  }
}
