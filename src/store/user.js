// --------- actions ----------
export function userSignedIn(user) {
  return {
    type: 'USER_SIGNED_IN',
    user,
  };
}

export function userSignedOut() {
  return {
    type: 'USER_SIGNED_OUT',
  };
}

// --------- reducer ----------
const defaultState = {
  authenticated: false,
  accessToken: null,
  refreshToken: null,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'USER_SIGNED_IN': {
      const { user } = action;
      const { accessToken, refreshToken } = user;
      delete user.accessToken;
      delete user.refreshToken;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      return {
        ...state,
        ...user,
        authenticated: true,
      };
    }

    case 'USER_SIGNED_OUT': {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return defaultState;
    }

    default:
      return state;
  }
};

export default reducer;
