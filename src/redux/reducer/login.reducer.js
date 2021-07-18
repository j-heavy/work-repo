const init = {
  isLogin: window.localStorage.getItem('isLogin') || false
};

export const loginReducer = (state = init, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLogin: action.payload }
    default:
      return state
  }
}
