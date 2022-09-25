import {
  $AUTH,
  $FAIL_AUTH,
  $GET_BOOKING_HISTORY,
  $SET_USER,
  $UNAUTH,
  $SIGNUP,
  $PATCH_USER,
  $PATCH_IMAGE,
  $GET_USER_BALANCE,
  $RESET_CLIENT_SECRET,
  $GET_CLIENT_SECRET,
} from "./user.constants";

export const UserBaseState = {
  user: false,
  token: false,
  bookingHistory: [],
  bookingHistoryLoaded: false,
  paymentMethods: false,
  userBalance: null,
  loginAttempts: 0,
  clientSecret: "",
};

export const UserReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case $AUTH: {
      return {
        ...state,
        token: payload,
        loginAttempts: 0,
      };
    }
    case $FAIL_AUTH: {
      return {
        ...state,
        loginAttempts: state.loginAttempts + 1,
      };
    }
    case $UNAUTH: {
      return UserBaseState;
    }
    case $SIGNUP: {
      return {
        ...state,
        token: payload,
      };
    }
    case $FAIL_AUTH: {
      return state;
    }
    case $SET_USER: {
      return {
        ...state,
        user: payload,
      };
    }
    case $GET_BOOKING_HISTORY: {
      return {
        ...state,
        ...payload,
      };
    }
    case $GET_USER_BALANCE: {
      return {
        ...state,
        userBalance: payload,
      };
    }

    case $GET_CLIENT_SECRET: {
      return {
        ...state,
        ...payload,
      };
    }
    case $RESET_CLIENT_SECRET: {
      return { ...state, clientSecret: "" };
    }
    case $PATCH_USER: {
      return { ...state, user: payload };
    }
    case $PATCH_IMAGE: {
      return { ...state, user: { ...state.user, profileImage: payload } };
    }
    default: {
      return state;
    }
  }
};
