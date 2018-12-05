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

export function userProfileFetched(profile) {
  return {
    type: 'USER_PROFILE_FETCHED',
    profile,
  };
}

// --------- reducer ----------
const defaultState = {
  authenticated: false,
  profile: {},
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'USER_SIGNED_IN': {
      const { user } = action;

      return {
        ...state,
        authenticated: user && true,
      };
    }

    case 'USER_SIGNED_OUT': {
      return { ...defaultState, authenticated: false };
    }

    case 'USER_PROFILE_FETCHED': {
      const { profile } = action;

      return {
        ...state,
        profile,
      };
    }

    default:
      return state;
  }
};

export default reducer;
