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

      return {
        ...state,
        ...user,
        authenticated: user && true,
      };
    }

    case 'USER_SIGNED_OUT': {
      return defaultState;
    }

    default:
      return state;
  }
};

export default reducer;
