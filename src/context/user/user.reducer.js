import {
  $AUTH,
  $FAIL_AUTH,
  $GET_BOOKING_HISTORY,
  $SET_USER,
  $UNAUTH,
  $SIGNUP,
  $GET_CLIENT_SECRET,
  $GET_PAYMENT_METHODS,
  $RESET_CLIENT_SECRET,
} from "./user.constants";

export const UserBaseState = {
  user: false,
  token: false,
  bookingHistory: [],
  bookingHistoryLoaded: false,
  clientSecret: "",
  paymentMethods: false,
};

export const UserReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case $AUTH: {
      return {
        ...state,
        token: payload,
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
    case $GET_PAYMENT_METHODS: {
      return {
        ...state,
        paymentMethods: payload,
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
    default: {
      return state;
    }
  }
};
